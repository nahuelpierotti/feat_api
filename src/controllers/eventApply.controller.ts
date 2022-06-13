import { Request, Response } from "express";
import { Entity,createQueryBuilder, getRepository } from "typeorm";
import { EventApply } from "../models/EventApply";
import { Person } from "../models/Person";
import { Player } from "../models/Player";
import { Sport } from "../models/Sport";
import { SportGeneric } from "../models/SportGeneric";
import { Event } from "../models/Event";


export const create = async (req: Request, res: Response) => {
    try{
      const userUid= req.body.userUid
      const eventId= req.body.eventId

      const playerByUser=  await
      createQueryBuilder()
      .select("player.id")
      .from(Player, "player")
      .innerJoin("player.person", "person")
      .innerJoin(SportGeneric,"sportGeneric","player.sport=sportGeneric.id")
      .innerJoin(Sport,"sport", "sportGeneric.id=sport.sportGenericId")
      .innerJoin(Event,"event","sport.id=event.sportId")
      .where("person.userUid = :userUid", {userUid })
      .andWhere("event.id= :eventId",{eventId})
      .getOneOrFail()
/*
      console.log(userUid)
      console.log(eventId)

      console.log(playerByUser)
      */

      const event_apply= await
      createQueryBuilder()
      .insert()
      .into(EventApply)
      .values({
          origin: 'S',
          state: + 6,
          event: + eventId,
          player: + playerByUser.id,    
          date: () => 'CURRENT_TIMESTAMP'
        }).execute()
      
      //  console.log(event_apply)

      res.status(200).json("Solicitud Enviada Exitosamente!");
  
    }catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  };

  
  export const getPlayerByPersonUidAndEvent=async (req: Request, res: Response) => {
    try{
      
     
        const player= await
        createQueryBuilder()
        .select("player.id")
        .from(Player, "player")
        .innerJoin("player.person", "person")
        .innerJoin(SportGeneric,"sportGeneric","player.sport=sportGeneric.id")
        .innerJoin(Sport,"sport", "sportGeneric.id=sport.sportGenericId")
        .innerJoin(Event,"event","sport.id=event.sportId")
        .where("person.userUid = :uid", { uid: req.params.userUid})
        .andWhere("event.id= :eventId",{eventId: req.params.eventId})
        .getOneOrFail()


        console.log(player)



        res.status(200).json(player);
  
    }catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }