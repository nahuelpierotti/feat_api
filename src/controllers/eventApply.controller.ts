import { Request, Response } from "express";
import { Entity,createQueryBuilder, getRepository } from "typeorm";
import { EventApply } from "../models/EventApply";
import { Person } from "../models/Person";
import { Player } from "../models/Player";
import { Sport } from "../models/Sport";
import { SportGeneric } from "../models/SportGeneric";
import { Event } from "../models/Event";
import { PlayerList } from "../models/PlayerList";


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

  export const getEventApply=async (req: Request, res: Response) => {
    try{
      const userUid= req.body.userUid
      const eventId= req.body.eventId

      console.log(userUid)
      console.log(eventId)

      const event_apply=  await
      createQueryBuilder()
      .select("eventApply.origin")
      .addSelect("player.id")
      .from(EventApply, "eventApply")
      .innerJoin("eventApply.player","player")
      .innerJoin("player.person", "person")
      .where("person.userUid = :userUid", {userUid })
      .andWhere("eventApply.eventId= :eventId",{eventId})
      .getOneOrFail()

      console.log(event_apply)
      res.status(200).json(event_apply);
  
    }catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }

  export const setAcceptedApply = async (req: Request, res: Response) => {
    try{
      const userUid = req.body.userUid
      const eventId = req.body.eventId
      
      const event_apply=  await
      createQueryBuilder()
      .select("eventApply")
      .addSelect("player.id")
      .from(EventApply, "eventApply")
      .innerJoin("eventApply.player","player")
      .innerJoin("player.person", "person")
      .where("person.userUid = :userUid", {userUid })
      .andWhere("eventApply.eventId= :eventId",{eventId})
      .getOneOrFail()

      const applyUpd= await
      createQueryBuilder()
      .update(EventApply)
      .set({
        state: + 7

      }).where("event = :eventId", { eventId})
      .andWhere("player = :playerId",{playerId: event_apply.player})
      .execute()

      console.log(applyUpd)

      const accept_apply= await
      createQueryBuilder()
      .insert()
      .into(PlayerList)
      .values({
          origin: event_apply.origin,
          state: + 9,
          event: + eventId,
          player: event_apply.player,    
          date: () => 'CURRENT_TIMESTAMP'
        }).execute()
      
        console.log(accept_apply)

      res.status(200).json("Invitacion Aceptada Exitosamente!");
  
    }catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  };

  export const setDeniedApply = async (req: Request, res: Response) => {
    try{
      const userUid = req.body.userUid
      const eventId = req.body.eventId
      
      const event_apply=  await
      createQueryBuilder()
      .select("eventApply")
      .addSelect("player.id")
      .from(EventApply, "eventApply")
      .innerJoin("eventApply.player","player")
      .innerJoin("player.person", "person")
      .where("person.userUid = :userUid", {userUid })
      .andWhere("eventApply.eventId= :eventId",{eventId})
      .getOneOrFail()

      const applyUpd= await
      createQueryBuilder()
      .update(EventApply)
      .set({
        state: + 8

      }).where("event = :eventId", { eventId})
      .andWhere("player = :playerId",{playerId: event_apply.player})
      .execute()

      console.log(applyUpd)

      res.status(200).json("Invitacion Aceptada Exitosamente!");
  
    }catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  };