import { Request, Response } from "express";
import { createQueryBuilder, getRepository } from "typeorm";
import { Calification } from "../models/Calification";
import { Person } from "../models/Person";
import { Player } from "../models/Player";


export const qualifyPlayers = async (req: Request, res: Response) => {
    try{
      const players= req.body.players
      const eventId= req.body.eventId
      
      players.forEach((player_calification:Calification) =>{ 
        const calification= 
        createQueryBuilder()
        .insert()
        .into(Calification)
        .values({
            event: + eventId,
            player: + player_calification.id,    
            liked: player_calification.liked,
            observation: player_calification.observation
          }).execute()
        
          console.log(calification)
        })
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
        
        console.log(result) 
          
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
        
        console.log(result) 
          
        res.status(200).json(result);    
    }catch(error){
      res.status(400).json(error);
    }
}