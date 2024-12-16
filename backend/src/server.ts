import express, { Request, Response } from "express";
import cors from "cors";
import { ListItem } from "./types";

const app = express();
const PORT = 5050;

const hardcodedItems: ListItem[] = [
  { name: "item1", id: 1 },
  { name: "item2", id: 2 },
  { name: "item3", id: 3 },
];

app.use(
  cors({
    origin: "http://localhost:3000", // specify the frontend URL
  })
);

app.get("/list-items", (req: Request, res: Response) => {
  res.json(hardcodedItems.map((item) => item.name));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
