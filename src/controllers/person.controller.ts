import { Request, Response } from "express";
import { createQueryBuilder, getRepository } from "typeorm";
import { Person } from "../models/Person";



export const findOne = async (req: Request, res: Response) => {
  try {
      
    const person= await getRepository(Person)
    .createQueryBuilder("person")
    .leftJoinAndSelect("person.availability","availability")
    .leftJoinAndSelect("availability.day","day")
    .leftJoin("person.user", "user")
    .where('user.uid = :uid', {uid: req.params.uid })
    .getOne()
    /*
    if(person==undefined){
      const js={
          "id": 0, 
          "lastname": "No",
          "names": "No",
          "birth_date": '0000-00-00T03:00:00.000Z',
          "sex": "M",
          "min_age": 0,
          "max_age": 0,
          "nickname": "no",
          "notifications": false,
          "willing_distance": 0
        }
        res.status(200).json(js);
      }
      
    */
     //console.log(person)
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

    }).where("id = :id", { id: req.body.id})
    .execute()

    console.log(personUpd)
    res.status(200).json("Actualizado Exitosamente!");

  }catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const updatePersonalInformation = async (req: Request, res: Response) => {
  try{
    const personUpd= await
    createQueryBuilder()
    .update(Person)
    .set({
      names: req.body.names,
      lastname: req.body.lastname,
      nickname:  req.body.nickname,
      birth_date: req.body.birth_date,
      sex: req.body.sex,

    }).where("id = :id", { id: req.body.id})
    .execute()

    console.log(personUpd)
    res.status(200).json("Actualizado Exitosamente!");

  }catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
