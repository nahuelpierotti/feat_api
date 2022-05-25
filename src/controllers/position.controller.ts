import { Request, Response } from "express";
import { createQueryBuilder } from "typeorm";
import {getRepository} from "typeorm";
import { Position } from "../models/Position";


export const findAll = async (req: Request, res: Response) => {
    try {
      const player= await getRepository(Position)
      .createQueryBuilder("position")
      .leftJoinAndSelect("postion.sport", "sport")
      .getMany()
  
      //console.log(event);
      res.status(200).json(event);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  };
  
  export const findOne = async (req: Request, res: Response) => {
    try {
      const event= await getRepository(Position)
      .createQueryBuilder("position")
      .where("position.id = :id", { id: req.params.id})
      .leftJoinAndSelect("position.sport", "sport")
      .getOne()
  
      //console.log(event);
      res.status(200).json(event);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  };
  