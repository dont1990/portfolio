import { Router } from "express";
import { getContactSubmissions, saveContactSubmission } from "../controllers/contact.controller";

const router = Router();

router.get("/", getContactSubmissions);
router.post("/", saveContactSubmission);

export default router;
