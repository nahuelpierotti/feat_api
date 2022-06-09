import { Request, Response } from "express";
import { createQueryBuilder } from "typeorm";
import {getRepository} from "typeorm";
import { EventApply } from "../models/EventApply";
import { Player } from "../models/Player";
import { PlayerList } from "../models/PlayerList";
import { PlayerSuggestion } from "../models/PlayerSuggestion";
import { SportGeneric } from "../models/SportGeneric";

export const findAll = async (req: Request, res: Response) => {
    try {
      const player= await getRepository(Player)
      .createQueryBuilder("player")
      .leftJoinAndSelect("player.person", "person")
      .leftJoinAndSelect(SportGeneric,"sportGeneric","player.sport=sportGeneric.id")
      .leftJoinAndSelect("player.position", "position")
      .leftJoinAndSelect("player.level", "level")
      .leftJoinAndSelect("player.valuation", "valuation")
      .getMany()
  
      //console.log(player);
      res.status(200).json(player);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  };

  export const findAllByPerson = async (req: Request, res: Response) => {
    try {
      const player= await getRepository(Player)
      .createQueryBuilder("player")
      .leftJoinAndSelect("player.person", "person")
      .leftJoinAndSelect(SportGeneric,"sportGeneric","player.sport=sportGeneric.id")
      .leftJoinAndSelect("player.position", "position")
      .leftJoinAndSelect("player.level", "level")
      .leftJoinAndSelect("player.valuation", "valuation")
      .where("player.person = :personId", { personId: req.params.person})
      .getMany()
  
      //console.log(player);
      res.status(200).json(player);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  };
  
  export const findOne = async (req: Request, res: Response) => {
    try {
      const player= await getRepository(Player)
      .createQueryBuilder("player")
      .where("player.id = :id", { id: req.params.id})
      .leftJoinAndSelect("player.person", "person")
      .leftJoinAndSelect(SportGeneric,"sportGeneric","player.sport=sportGeneric.id")
      .leftJoinAndSelect("player.position", "position")
      .leftJoinAndSelect("player.level", "level")
      .leftJoinAndSelect("player.valuation", "valuation")
      .getOne()
  
      //console.log(player);
      res.status(200).json(player);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  };

  export const create = async (req: Request, res: Response) => {
    try{
      const player= await
      createQueryBuilder()
      .insert()
      .into(Player)
      .values({
          abilities: req.body.abilities,
          person: + req.body.person,
          sport: + req.body.sport,
          position: + req.body.position,
          level: + req.body.level,
          valuation: + req.body.valuation   
      })
      .execute()
  
      console.log(player)
      res.status(200).json("Jugador Creado Exitosamente!");
  
    }catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  };

  export const findAllPlayersSuggestedForEvent=async (req: Request,res:Response)=>{
    try{  
        const result = await Player.query(
          'call get_players_suggested_for_event(?)',[req.params.eventId]);
  
          console.log(result) 
  
          const players= await getRepository(Player)
          .createQueryBuilder("player")
          .innerJoinAndSelect("player.person", "person")
          .leftJoinAndSelect(SportGeneric,"sportGeneric","player.sport=sportGeneric.id")
          .leftJoinAndSelect("player.position", "position")
          .leftJoinAndSelect("player.level", "level")
          .leftJoinAndSelect("player.valuation", "valuation")
          .innerJoinAndSelect(PlayerSuggestion, "sug", "player.id = sug.playerId")
          .where("sug.eventId = :id", { id: req.params.eventId})
          .getMany()
          
        res.status(200).json(players);   
         
    }catch(error){
      res.status(400).json(error);
    }
  }

  export const findAllPlayersConfirmedByEvent=async (req: Request,res:Response)=>{
    try{  
  
          const players= await getRepository(Player)
          .createQueryBuilder("player")
          .innerJoinAndSelect("player.person", "person")
          .leftJoinAndSelect(SportGeneric,"sportGeneric","player.sport=sportGeneric.id")
          .leftJoinAndSelect("player.position", "position")
          .leftJoinAndSelect("player.level", "level")
          .leftJoinAndSelect("player.valuation", "valuation")
          .innerJoinAndSelect(PlayerList, "playerlist", "player.id = playerlist.playerId")
          .where("playerlist.eventId = :id", { id: req.params.eventId})
          .getMany()
          
        res.status(200).json(players);   
         
    }catch(error){
      res.status(400).json(error);
    }
  }

  export const findAllPlayersAppliedByEvent=async (req: Request,res:Response)=>{
    try{  
  
          const players= await getRepository(Player)
          .createQueryBuilder("player")
          .innerJoinAndSelect("player.person", "person")
          .leftJoinAndSelect(SportGeneric,"sportGeneric","player.sport=sportGeneric.id")
          .leftJoinAndSelect("player.position", "position")
          .leftJoinAndSelect("player.level", "level")
          .leftJoinAndSelect("player.valuation", "valuation")
          .innerJoinAndSelect(EventApply, "apply", "player.id = apply.playerId")
          .where("apply.eventId = :id", { id: req.params.eventId})
          .getMany()
          
        res.status(200).json(players);   
         
    }catch(error){
      res.status(400).json(error);
    }
  }
  