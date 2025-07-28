// routes/hero.routes.ts
import { Router } from "express";
import { getHero, updateHero } from "../controllers/hero.controller";
import fs from "fs";
import path from "path";
import { upload } from "../middlewares/upload";

const router = Router();

router.get("/", getHero);
router.put("/", updateHero);

// Upload resume
router.post("/upload-resume", upload.single("resume"), (req, res) => {
  res.json({ message: "Resume uploaded successfully." });
});

// Download resume
router.get("/resume", (req, res) => {
  const resumePath = path.join(__dirname, "../uploads/resume.pdf");
  if (fs.existsSync(resumePath)) {
    res.download(resumePath);
  } else {
    res.status(404).send("Resume not found.");
  }
});

export default router;
