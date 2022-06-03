import { Request, Response } from "express";
import { createQueryBuilder } from "typeorm";
import { Person } from "../models/Person";



export const findOne = async (req: Request, res: Response) => {
  try {
      const person = await Person.findOne(req.params.id);
      if(person ==undefined){
        res.status(200).json("No existe");
      }
      res.status(200).json(person);
    } catch (error) {
      console.log(error)
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


export const update = async (req: Request, res: Response) => {
  try{
    const personUpd= await
    createQueryBuilder()
    .update(Person)
    .set({
      min_age: + req.body.min_age,
      max_age: + req.body.max_age,
      notifications:  req.body.notifications,
      willing_distance: + req.body.willing_distance

    }).where("id = :id", { id: req.params.id})
    .execute()

    console.log(personUpd)
    res.status(200).json("Actualizado Exitosamente!");

  }catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};