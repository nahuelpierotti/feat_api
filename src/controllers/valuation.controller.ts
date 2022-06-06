import { Request, Response } from "express";
import { Valuation } from "../models/Valuation";

export const findAll = async (req: Request, res: Response) => {
    try {
      const valuation = await Valuation.find();
      res.status(200).json(valuation);
    } catch (error) {
      res.status(400).json(error);
    }
  };