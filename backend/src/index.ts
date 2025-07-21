import express from "express";
import cors from "cors";
import heroRoutes from "./routes/hero.route";
import aboutRoutes from "./routes/about.route";
import skillsRouter from "./routes/skills.route";
import projectsRouter from "./routes/projects.route";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use("/api/hero", heroRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/skills", skillsRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/experiences", projectsRouter);


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
