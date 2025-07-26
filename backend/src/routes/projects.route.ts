import { Router } from "express";
import { getProjects, addProject, updateProject, deleteProject } from "../controllers/projects.controller";

const router = Router();

router.get("/", getProjects);
router.post("/", addProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;
