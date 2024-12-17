import React from "react";
import "./App.css";

export interface ListItem {
  description: string;
  timestamp: string;
  id?: number;
}

interface ListItemProps {
  items: ListItem[];
}

const ItemList: React.FC<ListItemProps> = ({ items }) => {
  return (
    <ul className="list">
      {items.length === 0 ? (
        <li>No items found</li>
      ) : (
        items.map((item, index) => (
          <li key={index} className="list-item">
            <span className="timestamp">{item.timestamp}</span>
            <p className="description">{item.description}</p>
          </li>
        ))
      )}
    </ul>
  );
};

export default ItemList;
