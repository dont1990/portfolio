import fs from "fs";
import path from "path";
import { Request, Response } from "express";
import AboutData from "../data/about.json";

const dataPath = path.join(__dirname, "../data/about.json");

export const getAbout = (req: Request, res: Response) => {
  res.json(AboutData);
};

export const updateAbout = (req: Request, res: Response) => {
  const updatedData = req.body;

  fs.writeFile(dataPath, JSON.stringify(updatedData, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to write data" });
    }
    res.status(200).json({ message: "About data updated" });
  });
};
