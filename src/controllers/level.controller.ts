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

  export const create = async (req: Request, res: Response) => {
    try{
      const level= await
      createQueryBuilder()
      .insert()
      .into(Level)
      .values({
          description: req.body.description,
          sport: + req.body.sport
      })
      .execute()
  
      console.log(level)
      res.status(200).json("Nivel Creado Exitosamente!");
  
    }catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  };
  