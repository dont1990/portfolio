import { Request, Response } from "express";
import experiencesData from "../data/experiences.json"

export const getExperiences = (req: Request, res: Response) => {
  res.json(experiencesData);
};
