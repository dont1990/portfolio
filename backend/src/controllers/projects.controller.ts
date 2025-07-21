import { Request, Response } from "express";
import ProjectsData from "../data/projects.json"

export const getProjects = (req: Request, res: Response) => {
  res.json(ProjectsData);
};
