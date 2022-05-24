import { Request, Response } from "express";
import { createQueryBuilder } from "typeorm";
import {getRepository} from "typeorm";
import { Event } from "../models/Event";
import { Sport } from "../models/Sport";


export const findAll = async (req: Request, res: Response) => {
  try {
    const event= await getRepository(Event)
    .createQueryBuilder("event")
    .leftJoinAndSelect("event.sportId", "sport")
    .leftJoinAndSelect("event.stateId", "state")
    .leftJoinAndSelect("event.periodicityId", "periodicity")
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
    const event= await getRepository(Event)
    .createQueryBuilder("event")
    .where("event.id = :id", { id: req.params.id})
    .leftJoinAndSelect("event.sportId", "sport")
    .leftJoinAndSelect("event.stateId", "state")
    .leftJoinAndSelect("event.periodicityId", "periodicity")
    .getOne()

    //console.log(event);
    res.status(200).json(event);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
