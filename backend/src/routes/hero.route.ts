import { Router } from "express";
import { getHero, updateHero } from "../controllers/hero.controller";

const router = Router();

router.get("/", getHero);
router.put("/", updateHero);

export default router;
