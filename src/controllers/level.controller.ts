import { Request, Response } from "express";
import { createQueryBuilder } from "typeorm";
import {getRepository} from "typeorm";
import { Level } from "../models/Level";

export const findAll = async (req: Request, res: Response) => {
    try {
      const level= await getRepository(Level)
      .createQueryBuilder("level")
      .getMany()
  
      //console.log(level);
      res.status(200).json(level);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  };
  
  export const findOne = async (req: Request, res: Response) => {
    try {
      const level= await getRepository(Level)
      .createQueryBuilder("level")
      .where("level.id = :id", { id: req.params.id})
      .getOne()
  
      //console.log(level);
      res.status(200).json(level);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  };
  