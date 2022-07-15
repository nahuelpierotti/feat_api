import { Request, Response } from "express";
import { createQueryBuilder, getRepository } from "typeorm";
import { Calification } from "../models/Calification";
import { Person } from "../models/Person";
import { Player } from "../models/Player";


export const qualifyPlayers = async (req: Request, res: Response) => {
    try{
      const arrayPlayers= req.body.players
      const eventId= + req.body.eventId

        for (const player_calification of arrayPlayers) {
      
        const calification= await
        createQueryBuilder()
        .insert()
        .into(Calification)
        .values({
            event: + eventId,
            player: + player_calification.id,    
            liked: player_calification.liked,
            observation: player_calification.observation,
            qualifier: player_calification.qualifier
          }).execute()
        
        }
        res.status(200).json("Calificaciones Enviadas Exitosamente!");

  
    }catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  };

  export const findAllByPlayer=async (req: Request,res:Response)=>{
    try{  
        const result = await getRepository(Calification)
        .createQueryBuilder("calification")
        .where('calification.playerId = :playerId', {playerId: req.params.playerId })
        .getMany()
          
        res.status(200).json(result);    
    }catch(error){
      res.status(400).json(error);
    }
}

export const findAllByUser=async (req: Request,res:Response)=>{
    try{  
        const result = await getRepository(Calification)
        .createQueryBuilder("calification")
        .innerJoin(Player,"player","calification.playerId=player.id")
        .innerJoin(Person,"person","player.personId=person.id")
        .where('person.userUid = :userUid', {userUid: req.params.userUid })
        .getMany()
          
        res.status(200).json(result);    
    }catch(error){
      res.status(400).json(error);
    }
}
