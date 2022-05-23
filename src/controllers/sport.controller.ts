import { Request, Response } from "express";
import { Sport } from "../models/Sport";

export const findAll = async (req: Request, res: Response) => {
  try {
    const sports = await Sport.find();
    res.status(200).json(sports);
  } catch (error) {
    res.status(400).json(error);
  }
};


export const findOne = async (req: Request, res: Response) => {
    try {
        const sports = await Sport.findOne(req.params.id);
        res.status(200).json(sports);
      } catch (error) {
        res.status(400).json(error);
      }
};
