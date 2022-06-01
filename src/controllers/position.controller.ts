import { Request, Response } from "express";
import { createQueryBuilder } from "typeorm";
import {getRepository} from "typeorm";
import { Position } from "../models/Position";


export const findAll = async (req: Request, res: Response) => {
    try {
      const position= await getRepository(Position)
      .createQueryBuilder("position")
      .leftJoinAndSelect("position.sport", "sport")
      .getMany()
  
      //console.log(position);
      res.status(200).json(position);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  };
  
  export const findOne = async (req: Request, res: Response) => {
    try {
      const position= await getRepository(Position)
      .createQueryBuilder("position")
      .where("position.id = :id", { id: req.params.id})
      .leftJoinAndSelect("position.sport", "sport")
      .getOne()
  
      //console.log(position);
      res.status(200).json(position);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  };

  export const create = async (req: Request, res: Response) => {
    try{
      const position= await
      createQueryBuilder()
      .insert()
      .into(Position)
      .values({
          description: req.body.description,
          sport: + req.body.sport
      })
      .execute()
  
      console.log(position)
      res.status(200).json("Posición Creada Exitosamente!");
  
    }catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  };
  