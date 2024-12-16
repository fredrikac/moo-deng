import React from "react";
import "./App.css";

interface ListItemProps {
  items: string[];
}

const ItemList: React.FC<ListItemProps> = ({ items }) => {
  return (
    <ul className="text-blue-800 p-4">
      {items.length === 0 ? (
        <li>No items found</li>
      ) : (
        items.map((item, index) => <li key={index}>{item}</li>)
      )}
    </ul>
  );
};

export default ItemList;
