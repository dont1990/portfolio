import { Router } from "express";
import { getExperiences } from "../controllers/experiences.controller";

const router = Router();

router.get("/", getExperiences);

export default router;
