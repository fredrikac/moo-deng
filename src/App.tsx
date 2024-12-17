import React, { useState, useEffect } from "react";
import ItemList from "./ItemList";
import "./App.css";
import { ListItem } from "./ItemList";

function App() {
  const [items, setItems] = useState<ListItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // use AbortController to cancel the fetch request if it takes too long
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);

        const response = await fetch("http://localhost:5050/list-items", {
          signal: controller.signal,
        });

        clearTimeout(timeout);
        // More error checking beyond just network errors
        if (!response.ok) {
          throw new Error(
            `Failed to fetch data, server responded with status: ${response.status}`
          );
        }

        const data = await response.json();
        setItems(data);
      } catch (error) {
        // Log specific error types differently
        if (error instanceof TypeError) {
          // network error or fetch failure
          setError("Network issues prevented fetching data");
        } else if (
          error instanceof DOMException &&
          error.name === "AbortError"
        ) {
          // Request timeout
          setError("Request timed out");
        } else {
          // generic
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const timestamp = formData.get("time") as string;
    const description = formData.get("description") as string;

    try {
      const response = await fetch("http://localhost:5050/add-item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ timestamp, description }),
      });
      const newEventItem = await response.json();
      setItems([...items, newEventItem]);
    } catch (error) {
      setError("Failed to add item");
    }
  };
  console.log("items", items);

  return (
    <div className="app-container">
      <ItemList items={items} />
      <form className="flex flex-row align-center mt-4" onSubmit={handleSubmit}>
        <label
          htmlFor="time"
          className="block text-sm font-medium text-gray-700"
        >
          Time
        </label>
        <input
          type="time"
          id="time"
          name="time"
          className="mt-1 p-2 border border-gray-300 rounded-md"
        />
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Event description
        </label>
        <input
          type="text"
          id="description"
          name="description"
          className="mt-1 p-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="mt-2 p-2 bg-blue-500 text-white rounded-md"
        >
          Button
        </button>
      </form>
    </div>
  );
}

export default App;
