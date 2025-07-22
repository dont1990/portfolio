import { Router } from "express";
import { getContactSubmissions, saveContactSubmission } from "../controllers/contact.controller";
// import { submitContact } from "../controllers/contact.controller";

const router = Router();

// router.post("/", submitContact);

router.get("/", getContactSubmissions);
router.post("/", saveContactSubmission);

export default router;
