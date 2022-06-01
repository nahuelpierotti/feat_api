import { Request, Response } from "express";
import { createQueryBuilder } from "typeorm";
import {getRepository} from "typeorm";
import { Periodicity } from "../models/Periodicity";

export const findAll = async (req: Request, res: Response) => {
    try {
      const periodicity = await Periodicity.find();
      res.status(200).json(periodicity);
    } catch (error) {
      res.status(400).json(error);
    }
  };
  
  
  export const findOne = async (req: Request, res: Response) => {
      try {
          const periodicity = await Periodicity.findOne(req.params.id);
          res.status(200).json(periodicity);
        } catch (error) {
          res.status(400).json(error);
        }
  };