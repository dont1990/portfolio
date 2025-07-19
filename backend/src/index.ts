import express from "express";
import cors from "cors";
import heroRoutes from "./routes/hero.route";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use("/api/hero", heroRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
