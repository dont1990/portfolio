import { Router } from "express";
import { getHero } from "../controllers/hero.controller";

const router = Router();

router.get("/", getHero);

export default router;
