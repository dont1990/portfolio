import { Request, Response } from "express";
import fs from "fs";
import path from "path";

const filePath = path.join(__dirname, "../data/contactInfo.json");

export const getContactInfo = (req: Request, res: Response) => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: "Failed to read contact info." });
  }
};

export const updateContactInfo = (req: Request, res: Response) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(req.body, null, 2));
    res.json({ message: "Contact info updated successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to update contact info." });
  }
};
