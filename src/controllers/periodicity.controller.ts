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

  export const create = async (req: Request, res: Response) => {
    try{
      const periodicity= await
      createQueryBuilder()
      .insert()
      .into(Periodicity)
      .values({
        description: req.body.description
      })
      .execute()
  
      console.log(periodicity)
      res.status(200).json("Creado Exitosamente!");
  
    }catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  };