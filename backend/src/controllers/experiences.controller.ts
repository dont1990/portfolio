import { Request, Response } from "express";
import ExperiencesData from "../data/experiences.json"

export const getExperiences = (req: Request, res: Response) => {
  res.json(ExperiencesData);
};
