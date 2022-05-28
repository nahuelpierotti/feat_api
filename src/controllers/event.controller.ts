import { Request, Response } from "express";
import { stat } from "fs";
import { createQueryBuilder } from "typeorm";
import {getRepository} from "typeorm";
import { Event } from "../models/Event";
import { EventApply } from "../models/EventApply";
import { Person } from "../models/Person";
import { Player } from "../models/Player";
import { PlayerList } from "../models/PlayerList";
import { Sport } from "../models/Sport";
import { State } from "../models/State";
import { User } from "../models/User";


export const findAll = async (req: Request, res: Response) => {
  try {
    const event= await getRepository(Event)
    .createQueryBuilder("event")
    .leftJoinAndSelect("event.sport", "sport")
    .leftJoinAndSelect("event.state", "state")
    .leftJoinAndSelect("event.periodicity", "periodicity")
    .leftJoinAndSelect("event.organizer", "organizer")
    .getMany()

    //console.log(event);
    res.status(200).json(event);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const findAllByOrganizer = async (req: Request, res: Response) => {
  try {
    const event= await getRepository(Event)
    .createQueryBuilder("event")
    .leftJoinAndSelect("event.sport", "sport")
    .leftJoinAndSelect("event.state", "state")
    .leftJoinAndSelect("event.periodicity", "periodicity")
    .leftJoinAndSelect("event.organizer", "organizer")
    .where('event.organizerId = :organizerId', {organizerId: req.params.organizer })
    .getMany()

    console.log(event);
    res.status(200).json(event);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const findAllCreatedByUser = async (req: Request, res: Response) => {
  try {
    const event= await getRepository(Event)
    .createQueryBuilder("event")
    .leftJoinAndSelect("event.sport", "sport")
    .leftJoinAndSelect("event.state", "state")
    .leftJoinAndSelect("event.periodicity", "periodicity")
    .leftJoinAndSelect("event.organizer", "organizer")
    .leftJoinAndSelect(Person, "person", "person.id = event.organizer")
    .leftJoinAndSelect(User, "user", "user.uid = person.userUid")
    .where('user.uid = :uid', {uid: req.params.uid })
    .getMany()

    console.log(event);
    res.status(200).json(event);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const findAllApplied = async (req: Request, res: Response) => {
  try {
    const event= await getRepository(Event)
    .createQueryBuilder("event")
    .innerJoinAndSelect("event.sport", "sport")
    .innerJoinAndSelect("event.state", "state")
    .innerJoinAndSelect("event.periodicity", "periodicity")
    .innerJoinAndSelect("event.organizer", "organizer")
    .innerJoin(Person, "person", "person.id = event.organizer")
    .innerJoin(User, "user", "user.uid = person.userUid")
    .innerJoinAndSelect(Player, "player", "player.personId = person.id")
    .innerJoinAndSelect(EventApply, "apply", "apply.playerId = player.id")
    .where('user.uid = :uid', {uid: req.params.uid })
    .andWhere('event.id = apply.eventId')
    .getMany()

    console.log(event);
    res.status(200).json(event);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const findAllConfirmed = async (req: Request, res: Response) => {
  try {
    const event= await getRepository(Event)
    .createQueryBuilder("event")
    .innerJoinAndSelect("event.sport", "sport")
    .innerJoinAndSelect("event.state", "state")
    .innerJoinAndSelect("event.periodicity", "periodicity")
    .innerJoinAndSelect("event.organizer", "organizer")
    .innerJoin(Person, "person", "person.id = event.organizer")
    .innerJoin(User, "user", "user.uid = person.userUid")
    .innerJoinAndSelect(Player, "player", "player.personId = person.id")
    .innerJoinAndSelect(PlayerList, "list", "list.playerId = player.id")
    .where('user.uid = :uid', {uid: req.params.uid })
    .andWhere('event.id = list.eventId')
    .getMany()

    console.log(event);
    res.status(200).json(event);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const findAllByUser = async (req: Request, res: Response) => {
  try {
    const confirmed= await getRepository(Event)
    .createQueryBuilder("event")
    .innerJoinAndSelect("event.sport", "sport")
    .innerJoinAndSelect("event.state", "state")
    .innerJoinAndSelect("event.periodicity", "periodicity")
    .innerJoinAndSelect("event.organizer", "organizer")
    .innerJoin(Person, "person", "person.id = event.organizer")
    .innerJoin(User, "user", "user.uid = person.userUid")
    .innerJoinAndSelect(Player, "player", "player.personId = person.id")
    .innerJoinAndSelect(PlayerList, "list", "list.playerId = player.id")
    .where('user.uid = :uid', {uid: req.params.uid })
    .andWhere('event.id = list.eventId')
    .getMany()

    const applied= await getRepository(Event)
    .createQueryBuilder("event")
    .innerJoinAndSelect("event.sport", "sport")
    .innerJoinAndSelect("event.state", "state")
    .innerJoinAndSelect("event.periodicity", "periodicity")
    .innerJoinAndSelect("event.organizer", "organizer")
    .innerJoin(Person, "person", "person.id = event.organizer")
    .innerJoin(User, "user", "user.uid = person.userUid")
    .innerJoinAndSelect(Player, "player", "player.personId = person.id")
    .innerJoinAndSelect(EventApply, "apply", "apply.playerId = player.id")
    .where('user.uid = :uid', {uid: req.params.uid })
    .andWhere('event.id = apply.eventId')
    .getMany()

    
    res.status(200).json(confirmed.concat(applied));
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
    .leftJoinAndSelect("event.sport", "sport")
    .leftJoinAndSelect("event.state", "state")
    .leftJoinAndSelect("event.periodicity", "periodicity")
    .getOne()

    //console.log(event);
    res.status(200).json(event);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const update = (req: Request, res: Response) => {
  res.send("update user");
};

export const deleteEvent = (req: Request, res: Response) => {
  res.send("delete user");
};

export const create = async (req: Request, res: Response) => {
  try{
    const event= await
    createQueryBuilder()
    .insert()
    .into(Event)
    .values({
        name: req.body.name,
        date: req.body.date,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        description: req.body.description,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        state: 1,
        sport: + req.body.sport,
        periodicity: + req.body.periodicity,    
        organizer: + req.body.organizer    
    })
    .execute()
    
    res.status(200).json("Evento Creado Exitosamente!");

  }catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

