import { Request, Response } from "express";
import AboutData from "../data/about.json";

export const getAbout = (req: Request, res: Response) => {
  res.json(AboutData);
};
