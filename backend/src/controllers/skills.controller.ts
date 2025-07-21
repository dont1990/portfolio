import { Request, Response } from "express";
import skillsData from "../data/skills.json"

export const getSkills = (req: Request, res: Response) => {
  res.json(skillsData);
};
