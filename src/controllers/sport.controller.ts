import { Request, Response } from "express";
import { getConnection, getRepository } from "typeorm";
import { Sport } from "../models/Sport";

export const findAll = async (req: Request, res: Response) => {
  try {
    const sports =await getRepository(Sport)
      .createQueryBuilder("sport")
      .innerJoinAndSelect("sport.sportGeneric", "sportGeneric")
      .getMany()

    res.status(200).json(sports);
  } catch (error) {
    res.status(400).json(error);
  }
};


export const findOne = async (req: Request, res: Response) => {
    try {
        const sports = await Sport.findOne(req.params.id);
        res.status(200).json(sports);
      } catch (error) {
        res.status(400).json(error);
      }
};
