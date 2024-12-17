import express, { Request, Response } from "express";
import cors from "cors";
import { ListItem } from "./types";

const app = express();
const PORT = 5050;

const hardcodedItems: ListItem[] = [
  { description: "item1", id: 1, timestamp: new Date().toISOString() },
  { description: "item2", id: 2, timestamp: new Date().toISOString() },
  { description: "item3", id: 3, timestamp: new Date().toISOString() },
];

app.use(
  cors({
    origin: "http://localhost:3000", // specify the frontend URL
  })
);

app.use(express.json());

app.get("/list-items", (req: Request, res: Response) => {
  res.json(hardcodedItems);
});

app.post("/add-item", (req: Request, res: Response) => {
  const { description, timestamp } = req.body as ListItem;
  const newItem: ListItem = {
    description,
    id: hardcodedItems.length + 1,
    timestamp,
  };
  hardcodedItems.push(newItem);
  res.json(newItem);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
