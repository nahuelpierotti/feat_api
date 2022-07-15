import { Request, Response } from "express";
import { createQueryBuilder, InsertResult } from "typeorm";
import {getRepository} from "typeorm";
import { Availability } from "../models/Availability";

export const findAll = async (req: Request, res: Response) => {
    try {
      const availability= await getRepository(Availability)
      .createQueryBuilder("availability")
      .leftJoinAndSelect("availability.person", "person")
      .leftJoinAndSelect("availability.day", "day")
      .getMany()
  
      //;
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
  
      //;
      res.status(200).json(availability);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  };

  export const create = async (req: Request, res: Response) => {
    try{
      
      const start_time1= req.body.start_time1;
      const end_time1= req.body.end_time1;

      const start_time2= req.body.start_time2;
      const end_time2= req.body.end_time2;

      const start_time3= req.body.start_time3;
      const end_time3= req.body.end_time3;

      const start_time4= req.body.start_time4;
      const end_time4= req.body.end_time4;

      const start_time5= req.body.start_time5;
      const end_time5= req.body.end_time5;

      const start_time6= req.body.start_time6;
      const end_time6= req.body.end_time6;

      const start_time7= req.body.start_time7;
      const end_time7= req.body.end_time7;

      if(start_time1!=null && end_time1!=null){

        const availability= await
        createQueryBuilder()
        .insert()
        .into(Availability)
        .values({
          start_time: start_time1,
          end_time: end_time1,
          person: + req.body.person,
          day: 1

        })
        .execute()
    }

    if(start_time2!=null && end_time2!=null){

      const availability= await
      createQueryBuilder()
      .insert()
      .into(Availability)
      .values({
        start_time: start_time2,
        end_time: end_time2,
        person: + req.body.person,
        day: 2

      })
      .execute()
      
  }

  if(start_time3!=null && end_time3!=null){

        const availability= await
        createQueryBuilder()
        .insert()
        .into(Availability)
        .values({
          start_time: start_time3,
          end_time: end_time3,
          person: + req.body.person,
          day: 3

        })
        .execute()
        
    }
    
    if(start_time4!=null && end_time4!=null){

      const availability= await
      createQueryBuilder()
      .insert()
      .into(Availability)
      .values({
        start_time: start_time4,
        end_time: end_time4,
        person: + req.body.person,
        day: 4

      })
      .execute()
      
    }

    if(start_time5!=null && end_time5!=null){

      const availability= await
      createQueryBuilder()
      .insert()
      .into(Availability)
      .values({
        start_time: start_time5,
        end_time: end_time5,
        person: + req.body.person,
        day: 5

      })
      .execute()
      
    }

    if(start_time6!=null && end_time6!=null){

      const availability= await
      createQueryBuilder()
      .insert()
      .into(Availability)
      .values({
        start_time: start_time6,
        end_time: end_time6,
        person: + req.body.person,
        day: 6

      })
      .execute()
      
    }

    if(start_time7!=null && end_time7!=null){

      const availability= await
      createQueryBuilder()
      .insert()
      .into(Availability)
      .values({
        start_time: start_time7,
        end_time: end_time7,
        person: + req.body.person,
        day: 7

      })
      .execute()
      
    }
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
      }).where("availability.id = :id", { id: req.body.id})
      .execute()
  
      
      res.status(200).json("Creado Exitosamente!");
  
    }catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  };
  