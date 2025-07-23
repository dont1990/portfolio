import { Request, Response } from "express";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(__dirname, "../data/contactSubmissions.json");

// Helper: read submissions
const readSubmissions = () => {
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify([]));
  }
  const fileData = fs.readFileSync(dataFilePath, "utf-8");
  return JSON.parse(fileData);
};

// Helper: write submissions
const writeSubmissions = (data: any[]) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

export const getContactSubmissions = (req: Request, res: Response) => {
  try {
    const submissions = readSubmissions();
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: "Failed to read submissions." });
  }
};

export const saveContactSubmission = (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const submissions = readSubmissions();

    const newSubmission = {
      id: Date.now(), // simple unique id
      name,
      email,
      subject,
      message,
      submittedAt: new Date().toISOString(),
    };

    submissions.push(newSubmission);
    writeSubmissions(submissions);

    res.status(201).json({ message: "Submission saved.", submission: newSubmission });
  } catch (error) {
    res.status(500).json({ message: "Failed to save submission." });
  }
};

