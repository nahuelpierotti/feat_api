import { Request, Response } from "express";
import { createQueryBuilder } from "typeorm";
import { Event } from "../models/Event";
import { Sport } from "../models/Sport";

export const findAll = async (req: Request, res: Response) => {
  try {
    const event = await createQueryBuilder("event")
    .leftJoinAndSelect("event.sportId", "sport")
    //.where("user.name = :name", { name: "Timber" })
    .getMany();
    
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json(error);
  }
};

/*
export const findAll = async (req: Request, res: Response) => {
  try {
    const event = await Event.find();
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json(error);
  }
};
*/

export const findOne = async (req: Request, res: Response) => {
    try {
        const event = await Event.findOne(req.params.id);
        res.status(200).json(event);
      } catch (error) {
        res.status(400).json(error);
      }
};
