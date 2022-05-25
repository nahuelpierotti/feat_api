import { Request, Response } from "express";
import { createQueryBuilder } from "typeorm";
import {getRepository} from "typeorm";
import { Player } from "../models/Player";

export const findAll = async (req: Request, res: Response) => {
    try {
      const player= await getRepository(Player)
      .createQueryBuilder("player")
      .leftJoinAndSelect("player.person", "person")
      .leftJoinAndSelect("player.sport", "sport")
      .leftJoinAndSelect("player.position", "position")
      .leftJoinAndSelect("player.level", "level")
      .leftJoinAndSelect("player.valuation", "valuation")
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
      const event= await getRepository(Player)
      .createQueryBuilder("player")
      .where("player.id = :id", { id: req.params.id})
      .leftJoinAndSelect("player.person", "person")
      .leftJoinAndSelect("player.sport", "sport")
      .leftJoinAndSelect("player.position", "position")
      .leftJoinAndSelect("player.level", "level")
      .leftJoinAndSelect("player.valuation", "valuation")
      .getOne()
  
      //console.log(event);
      res.status(200).json(event);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  };
  