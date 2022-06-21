import { Request, Response } from "express";
import { stat } from "fs";
import { createQueryBuilder, getManager } from "typeorm";
import {getRepository} from "typeorm";
import { Event } from "../models/Event";
import { EventApply } from "../models/EventApply";
import { EventSuggestion } from "../models/EventSuggestion";
import { Person } from "../models/Person";
import { Player } from "../models/Player";
import { PlayerList } from "../models/PlayerList";
import { Sport } from "../models/Sport";
import { SportGeneric } from "../models/SportGeneric";
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
    .where('DATE(event.date) = CURRENT_DATE')
    .andWhere("event.state <> 4") //filtro eventos cancelados
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
    .andWhere("concat(date(event.date),' ',start_time)>=CURRENT_TIMESTAMP")
    .andWhere("event.state <> 4") //filtro eventos cancelados
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
    .andWhere("event.state <> 4") //filtro eventos cancelados
    .andWhere("concat(date(event.date),' ',start_time)>=CURRENT_TIMESTAMP")
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
    .andWhere("concat(date(event.date),' ',start_time)>=CURRENT_TIMESTAMP")
    .andWhere("event.state <> 4") //filtro eventos cancelados
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
    .andWhere("concat(date(event.date),' ',start_time)>=CURRENT_TIMESTAMP")
    .andWhere("event.state <> 4") //filtro eventos cancelados
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
    const eventList= await getRepository(Event)
    .createQueryBuilder("event")
    .innerJoinAndSelect("event.sport", "sport")
    .innerJoinAndSelect("event.state", "state")
    .innerJoinAndSelect("event.periodicity", "periodicity")
    .innerJoin("event.organizer", "organizer")
    .innerJoin(Person, "person", "person.id = event.organizer")
    .innerJoin(User, "user", "user.uid = person.userUid")
    .innerJoin(Player, "player", "player.personId = person.id")
    .where('user.uid = :uid', {uid: req.params.uid })
    .andWhere('player.id IN(select playerId from player_list  where eventId=event.id  union  select playerId from event_apply  where eventId=event.id ) ')
    .andWhere("concat(date(event.date),' ',start_time)>=CURRENT_TIMESTAMP")
    .andWhere("event.state <> 4") //filtro eventos cancelados
    .getMany()
    
    res.status(200).json(eventList);
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
    .andWhere("concat(date(event.date),' ',start_time)>=CURRENT_TIMESTAMP")
    .getOne()

    //console.log(event);
    res.status(200).json(event);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const findAllEventSuggestedForUser=async (req: Request,res:Response)=>{
  try{  
      const result = await Event.query(
        'call get_events_suggested_for_user(?)',[req.params.uid]);

        console.log(result) 

        const event= await getRepository(Event)
        .createQueryBuilder("event")
        .innerJoinAndSelect("event.sport", "sport")
        .innerJoinAndSelect("event.state", "state")
        .innerJoinAndSelect("event.periodicity", "periodicity")
        .innerJoinAndSelect("event.organizer", "organizer")
        .innerJoinAndSelect(EventSuggestion, "sug", "event.id = sug.eventId")
        .leftJoin(Person, "person", "sug.personId = person.id")
        .innerJoin(Player,"player","person.id=player.personId and sport.sportGeneric=player.sportGenericId")
        .innerJoin(User, "user", "user.uid = person.userUid")
        .where('user.uid = :uid', {uid: req.params.uid })
        .andWhere('event.id = sug.eventId')
        .andWhere("event.state <> 4") //filtro eventos cancelados
        .andWhere("concat(date(event.date),' ',start_time)>=CURRENT_TIMESTAMP")
        .andWhere('player.id NOT IN(select playerId from player_list  where eventId=event.id  union  select playerId from event_apply  where eventId=event.id ) ')
        .orderBy("concat(date(event.date),' ',event.start_time)", "ASC")
        .getMany()
        
      res.status(200).json(event);   
       
  }catch(error){
    res.status(400).json(error);
  }
}

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

export const setConfirmed = async (req: Request, res: Response) => {
  try{
    const event= await
    createQueryBuilder()
    .update(Event)
    .set({
      state: + 3,
      updated: () => 'CURRENT_TIMESTAMP'
    }).where("id = :id", { id: req.body.id})
    .execute()
    
    res.status(200).json("Evento Confirmado Exitosamente!");

  }catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const setCanceled = async (req: Request, res: Response) => {
  try{
    const event= await
    createQueryBuilder()
    .update(Event)
    .set({
      state: + 4,
      updated: () => 'CURRENT_TIMESTAMP'
    }).where("id = :id", { id: req.body.id})
    .execute()
    
    res.status(200).json("Evento Cancelado Exitosamente!");

  }catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const findAllOfTheWeek = async (req: Request, res: Response) => {
  try {
    
    const event= await getRepository(Event)
    .createQueryBuilder("event")
    .leftJoinAndSelect("event.sport", "sport")
    .leftJoinAndSelect("event.state", "state")
    .leftJoinAndSelect("event.periodicity", "periodicity")
    /*.leftJoinAndSelect("event.organizer", "organizer")
    .innerJoin(Player,"player","sport.sportGeneric=player.sportGenericId")
    .innerJoin(Person,"person", "player.personId=person.id")
    .where('person.userUid = :uid', {uid: req.params.uid })*/
    .where('DATE(event.date) >= CURRENT_DATE')
    .andWhere(' DATE(event.date) <= DATE_ADD(NOW(), INTERVAL 7 DAY) ')
    .andWhere("event.state <> 4") //filtro eventos cancelados
    //.andWhere('player.id IN(select playerId from player_list  where eventId=event.id  union  select playerId from event_apply  where eventId=event.id ) ')
    .orderBy('event.date, event.start_time ', 'ASC')
    .getMany()

    //console.log(event);
    res.status(200).json(event);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const findAllInvitationsForUser=async (req: Request,res:Response)=>{
  try{  

        const event= await getRepository(Event)
        .createQueryBuilder("event")
        .innerJoinAndSelect("event.sport", "sport")
        .innerJoinAndSelect("event.state", "state")
        .innerJoinAndSelect("event.periodicity", "periodicity")
        .innerJoinAndSelect("event.organizer", "organizer")
        .innerJoinAndSelect(EventApply, "apply", "event.id = apply.eventId")
        .innerJoin(Player,"player","apply.playerId=player.id")
        .innerJoin(Person, "person", "player.personId = person.id")
        .innerJoin(User, "user", "user.uid = person.userUid")
        .where('user.uid = :uid', {uid: req.params.uid })
        .andWhere('apply.stateId = 6')
        .andWhere("apply.origin = 'O'")
        .andWhere("concat(date(event.date),' ',start_time)>=CURRENT_TIMESTAMP")
        .andWhere("event.state <> 4") //filtro eventos cancelados
        .orderBy("concat(date(event.date),' ',event.start_time)", "ASC")
        .getMany()
        
      res.status(200).json(event);   
       
  }catch(error){
    res.status(400).json(error);
  }
};

export const findAllConfirmedOrAppliedByUser = async (req: Request, res: Response) => {
  try {
    const eventList= await getRepository(Event)
    .createQueryBuilder("event")
    .select("event.id,event.name,event.date,event.start_time,event.end_time,event.latitude,event.longitude,state.description as state_desc,sport.description sport_desc,case when eventApply.stateId=6 then 'Aplicado' else 'Confirmado' end as origen ")
    .innerJoin("event.sport", "sport")
    .innerJoin("event.state", "state")
    .innerJoin("event.periodicity", "periodicity")
    .innerJoin("event.eventApply","eventApply")
    .innerJoin(SportGeneric, "generic", "event.sportId = generic.id")
    .innerJoin(Player, "player", "generic.id = player.sportGenericId and eventApply.playerId=player.id")
    .innerJoin(Person, "person", "player.personId = person.id")
    .innerJoin(User, "user", "user.uid = person.userUid")
    //.innerJoinAndSelect(EventApply,"apply", "event.id=apply.eventId and player.id=apply.playerId ")
    .where('user.uid = :uid', {uid: req.params.uid })
    .andWhere('player.id IN(select playerId from player_list  where eventId=event.id  union  select playerId from event_apply  where eventId=event.id ) ')
    .andWhere("concat(date(event.date),' ',start_time)>=CURRENT_TIMESTAMP")
    .andWhere("event.state <> 4") //filtro eventos cancelados
    .andWhere("eventApply.stateId <> 8") // filtro de solicitudes rechazadas
    .orderBy("concat(date(event.date),' ',event.start_time)", "ASC")
    .getRawMany()
    
    res.status(200).json(eventList);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
