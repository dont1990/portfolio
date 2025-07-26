import { Request, Response } from "express";
import fs from "fs";
import path from "path";

const skillsPath = path.join(__dirname, "../data/skills.json");

export const getSkills = (_: Request, res: Response) => {
  const data = fs.readFileSync(skillsPath, "utf-8");
  res.json(JSON.parse(data));
};

export const updateSkills = (req: Request, res: Response) => {
  try {
    fs.writeFileSync(skillsPath, JSON.stringify(req.body, null, 2));
    res.status(200).json({ message: "Skills updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update skills", error: err });
  }
};
