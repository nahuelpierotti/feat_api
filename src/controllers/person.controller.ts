import { Request, Response } from "express";
import { createQueryBuilder, getRepository } from "typeorm";
import { Person } from "../models/Person";
import { User } from "../models/User";


export const findOne = async (req: Request, res: Response) => {
  try {
      const person = await Person.findOne(req.params.id);
      res.status(200).json(person);
    } catch (error) {
      res.status(400).json(error);
    }
};

export const create = async (req: Request, res: Response) => {
  try{
    const person= await
    createQueryBuilder()
    .insert()
    .into(Person)
    .values({
        lastname: req.body.lastname,
        names: req.body.names,
        birth_date: req.body.birth_date,
        sex: req.body.sex,
        min_age: req.body.min_age,
        max_age: req.body.max_age,
        nickname: req.body.nickname,
        user: req.body.userUid,
    })
    .execute()

    console.log(person)
    res.status(200).json("Persona creada exitosamente!");

  }catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

