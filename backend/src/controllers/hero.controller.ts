import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import heroData from "../data/hero.json";

const filePath = path.join(__dirname, "../data/hero.json");

export const getHero = (req: Request, res: Response) => {
  res.json(heroData);
};

export const updateHero = (req: Request, res: Response) => {
  console.log("req", req);
  try {
    fs.writeFileSync(filePath, JSON.stringify(req.body, null, 2));
    res.json({ message: "Hero data updated successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to update hero data." });
  }
};
