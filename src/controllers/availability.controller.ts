import { Request, Response } from "express";
import { createQueryBuilder } from "typeorm";
import {getRepository} from "typeorm";
import { Availability } from "../models/Availability";

export const findAll = async (req: Request, res: Response) => {
    try {
      const availability= await getRepository(Availability)
      .createQueryBuilder("availability")
      .leftJoinAndSelect("availability.person", "person")
      .leftJoinAndSelect("availability.day", "day")
      .leftJoinAndSelect("availability.turn", "turn")
      .getMany()
  
      //console.log(availability);
      res.status(200).json(availability);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  };
  
  export const findOne = async (req: Request, res: Response) => {
    try {
      const availability= await getRepository(Availability)
      .createQueryBuilder("availability")
      .where("availability.id = :id", { id: req.params.id})
      .leftJoinAndSelect("availability.person", "person")
      .leftJoinAndSelect("availability.day", "day")
      .leftJoinAndSelect("availability.turn", "turn")
      .getOne()
  
      //console.log(availability);
      res.status(200).json(availability);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  };
  