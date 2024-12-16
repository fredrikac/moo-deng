import express from "express";
import cors from "cors";

const app = express();
const PORT = 5050;

app.use(
  cors({
    origin: "http://localhost:3000", // specify the frontend URL
  })
);

app.get("/list-items", (req, res) => {
  res.json(["item1", "item2", "item3"]);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
