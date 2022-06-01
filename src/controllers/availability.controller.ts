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
      .getOne()
  
      //console.log(availability);
      res.status(200).json(availability);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  };

  export const create = async (req: Request, res: Response) => {
    try{
      const availability= await
      createQueryBuilder()
      .insert()
      .into(Availability)
      .values({
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        person: + req.body.person,
        day: + req.body.day

      })
      .execute()
  
      console.log(availability)
      res.status(200).json("Creado Exitosamente!");
  
    }catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  };

  export const update = async (req: Request, res: Response) => {
    try{
      const availability= await
      createQueryBuilder()
      .update(Availability)
      .set({
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        day: + req.body.day
      }).where("availability.id = :id", { id: req.params.id})
      .execute()
  
      console.log(availability)
      res.status(200).json("Creado Exitosamente!");
  
    }catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  };
  