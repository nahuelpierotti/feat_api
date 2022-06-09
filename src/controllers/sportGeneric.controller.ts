import { Request, Response } from "express";
import { SportGeneric } from "../models/SportGeneric";

export const findAll = async (req: Request, res: Response) => {
    try {
      const sportsGeneric = await SportGeneric.find();
      res.status(200).json(sportsGeneric);
    } catch (error) {
      res.status(400).json(error);
    }
  };