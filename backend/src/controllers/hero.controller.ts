import { Request, Response } from "express";
import heroData from "../data/hero.json"

export const getHero = (req: Request, res: Response) => {
  res.json(heroData);
};
