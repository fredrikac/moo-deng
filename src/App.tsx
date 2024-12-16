import React, { useState, useEffect } from "react";
import ItemList from "./ItemList";
import "./App.css";

function App() {
  const [items, setItems] = useState<string[]>([]);
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

  return (
    <div className="container m-4 p-8 border-2 border-blue-200 rounded-lg">
      <h1 className="text-2xl font-bold text-blue-900">List items</h1>
      <ItemList items={items} />
    </div>
  );
}

export default App;
