import { Request, Response } from "express";
import { createQueryBuilder } from "typeorm";
import {getRepository} from "typeorm";
import { Position } from "../models/Position";
import { SportGeneric } from "../models/SportGeneric";


export const findAll = async (req: Request, res: Response) => {
    try {
      const position= await getRepository(Position)
      .createQueryBuilder("position")
      .leftJoinAndSelect(SportGeneric,"sportGeneric","position.sport=sportGeneric.id")
      .getMany()

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
      .leftJoinAndSelect(SportGeneric,"sportGeneric","position.sport=sportGeneric.id")
      .getOne()

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
  
      res.status(200).json("Posición Creada Exitosamente!");
  
    }catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  };
  
  export const findAllBySportGeneric = async (req: Request, res: Response) => {
    try {
      const position= await getRepository(Position)
      .createQueryBuilder("position")
      .addSelect("gen.description", "sport")
      .innerJoin(SportGeneric, "gen", "position.sportGenericId = gen.id")
      .where("gen.id = :id", { id: req.params.id})
      .getMany()
  
      res.status(200).json(position);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  };