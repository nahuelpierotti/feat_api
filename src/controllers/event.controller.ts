import { Request, Response } from "express";
import { stat } from "fs";
import { createQueryBuilder, getManager, SelectQueryBuilder } from "typeorm";
import {getRepository} from "typeorm";
import { Address } from "../models/Address";
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
import { sendPushToOneUser, subscribeTopic } from "../notifications";


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

    const pl=await getRepository(Player)
        .createQueryBuilder("player")
        .leftJoin(Person, "person","person.id=player.personId")
        .where('person.userUid = :uid', {uid: req.params.uid })
        .getMany()

        console.log("Sugeridos usuario: "+pl)
        pl.forEach((jug) =>{ 
          const upd_qualif =  Player.query(
            'call set_player_calification(?)',[jug.id]);
            console.log("Ejecuto actualizacion calif: "+upd_qualif) 
        })


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
    const pl=await getRepository(Player)
        .createQueryBuilder("player")
        .leftJoin(Person, "person","person.id=player.personId")
        .where('person.userUid = :uid', {uid: req.params.uid })
        .getMany()

        console.log("Sugeridos usuario: "+pl)
        pl.forEach((jug) =>{ 
          const upd_qualif =  Player.query(
            'call set_player_calification(?)',[jug.id]);
            console.log("Ejecuto actualizacion calif: "+upd_qualif) 
        })

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
    .leftJoinAndSelect("sport.sportGeneric","sportGeneric")
    .leftJoinAndSelect("event.state", "state")
    .leftJoinAndSelect("event.periodicity", "periodicity")
    .leftJoinAndSelect("event.organizer","person")
    //.andWhere("concat(date(event.date),' ',start_time)>=CURRENT_TIMESTAMP")
    .getOne()

    console.log(event);
    res.status(200).json(event);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const findAllEventSuggestedForUser=async (req: Request,res:Response)=>{
  try{  
    /*
        const pl=await getRepository(Player)
        .createQueryBuilder("player")
        .leftJoin(Person, "person","person.id=player.personId")
        .where('person.userUid = :uid', {uid: req.params.uid })
        .getMany()

        console.log("Sugeridos usuario: "+pl)
        pl.forEach((jug) =>{ 
          const upd_qualif =  Player.query(
            'call set_player_calification(?)',[jug.id]);
            console.log("Ejecuto actualizacion calif: "+upd_qualif) 
        })*/

        const result = await Event.query(
        'call get_events_suggested_for_user(?)',[req.params.uid]);
        console.log(result) 
        
        const event= await getRepository(Event)
        .createQueryBuilder("event")
        .innerJoinAndSelect("event.sport", "sport")
        .innerJoinAndSelect("event.state", "state")
        .innerJoinAndSelect("event.periodicity", "periodicity")
        .innerJoinAndSelect(EventSuggestion, "sug", "event.id = sug.eventId")
        .leftJoin(Person, "person", "sug.personId = person.id")
        .innerJoin(Player,"player","person.id=player.personId and sport.sportGeneric=player.sportGenericId")
        .innerJoin(User, "user", "user.uid = person.userUid")
        .where('user.uid = :uid', {uid: req.params.uid })
        .andWhere("event.organizer <> person.id")
        .andWhere('event.id = sug.eventId')
        .andWhere("event.state not in(4,2) ") //filtro eventos cancelados y completos
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
    
    const idEvento=event.raw.insertId;

    const organizador=await getRepository(Player)
    .createQueryBuilder("player")
    .select("player")
    .leftJoin(Person,"person","player.personId=person.id")
    .leftJoin(Event,"event","person.id=event.organizer")
    .leftJoin(Sport,"sport","event.sportId=sport.id and player.sportGenericId=sport.sportGenericId")
    .where("person.id= :id",{id : +req.body.organizer})
    .andWhere("event.id= :eventId",{eventId: idEvento})
    .getOne()
    
    console.log("Jugador del Organizador: "+organizador?.id)
     
    if(organizador?.id ==undefined){
    
    const event_apply= await
        createQueryBuilder()
        .insert()
        .into(EventApply)
        .values({
            origin: "O",
            state: + 7,
            event: + event.raw.insertId,
            player:   organizador?.id,    
            date: () => 'CURRENT_TIMESTAMP'
          }).execute()

    const player_list= await
    createQueryBuilder()
    .insert()
    .into(PlayerList)
    .values({
        origin: "O",
        state: + 9,
        event: + event.raw.insertId,
        player:   organizador?.id,    
        date: () => 'CURRENT_TIMESTAMP'
      }).execute()
        
    }
    
    console.log(event.raw.insertId)
    const nombre=req.body.name.replace(/\s/g, "");
    const tema=event.raw.insertId+"-"+nombre

    console.log("Tema: "+tema)

    const tokenList = await getRepository(User)
    .createQueryBuilder("user")
    .select("user.mobileToken")
    .leftJoin(Person,"person","user.uid=person.userUid")
    .leftJoin(Player, "player", "person.id = player.personId")
    .leftJoin(EventApply, "apply", "player.id=apply.playerId ")
    .where('apply.eventId = :eventId', { eventId: event.raw.insertId })
    .getMany();

    console.log(tokenList)

    tokenList.forEach((user) =>{ 
      console.log(subscribeTopic(tema,user.mobileToken.toString()))
      console.log(sendPushToOneUser(user.mobileToken.toString(), "Creaste un nuevo evento", "Ya podes invitar a jugadores"))
    })
    

    res.status(200).json("Evento Creado Exitosamente!"+tokenList);

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
    const uid=req.params.uid

    const event= await getRepository(Event)
    .createQueryBuilder("event")
    .leftJoinAndSelect("event.sport", "sport")
    .leftJoinAndSelect("event.state", "state")
    .leftJoinAndSelect("event.periodicity", "periodicity")
    .where('DATE(event.date) >= CURRENT_DATE')
    .andWhere(' DATE(event.date) <= DATE_ADD(NOW(), INTERVAL 7 DAY) ')
    .andWhere("event.state not in(4,2) ") //filtro eventos cancelados y completos
    .andWhere("event.id NOT IN("+
      " select eventId from player_list l "+
      " join player pl on l.playerId=pl.id "+
      " join person p on pl.personId=p.id "+
      " where p.userUid='"+uid+"'"+
      " and stateId not in(9,10) "+
      " union "+
      " select eventId from event_apply a "+
      " join player pl on a.playerId=pl.id "+
      " join person p on pl.personId=p.id "+
      " where p.userUid='"+uid+"'"+
      " and stateId not in(6,7) "+
      ") "+
      "AND event.organizer <> (select distinct id from person where userUid='"+uid+"')")
    .orderBy('event.date, event.start_time ', 'ASC')
    .getMany()

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
        .andWhere("event.state not in(4,2) ") //filtro eventos cancelados y completos
        .orderBy("concat(date(event.date),' ',event.start_time)", "ASC")
        .getMany()
        
      res.status(200).json(event);   
       
  }catch(error){
    res.status(400).json(error);
  }
};

export const findAllConfirmedOrAppliedByUser = async (req: Request, res: Response) => {
  try {

    const pl=await getRepository(Player)
        .createQueryBuilder("player")
        .leftJoin(Person, "person","person.id=player.personId")
        .where('person.userUid = :uid', {uid: req.params.uid })
        .getMany()

        console.log("Sugeridos usuario: "+pl)
        pl.forEach((jug) =>{ 
          const upd_qualif =  Player.query(
            'call set_player_calification(?)',[jug.id]);
            console.log("Ejecuto actualizacion calif: "+upd_qualif) 
        })

    const eventList= await getRepository(Event)
    .createQueryBuilder("event")
    .select("event.id,event.name,event.date,event.start_time,event.end_time,event.latitude,event.longitude,state.description as state_desc,sport.description sport_desc,case when eventApply.stateId=6 then 'Aplicado' else 'Confirmado' end as origen,"
     + " CASE WHEN event.organizer=person.id THEN true else false end as is_organizer ")
    .leftJoin("event.sport", "sport")
    .leftJoin("event.state", "state")
    .leftJoin("event.periodicity", "periodicity")
    .leftJoin("event.eventApply","eventApply")
    .leftJoin(SportGeneric, "generic", "sport.sportGeneric = generic.id")
    .leftJoin(Player, "player", "generic.id = player.sportGenericId and eventApply.playerId=player.id")
    .leftJoin(Person, "person", "player.personId = person.id")
    .leftJoin(User, "user", "user.uid = person.userUid")
    //.innerJoinAndSelect(EventApply,"apply", "event.id=apply.eventId and player.id=apply.playerId ")
    .where('user.uid = :uid', {uid: req.params.uid })
    //.andWhere("player.id IN(select playerId from player_list  where eventId=event.id and stateId in(9,10))")
    .andWhere("concat(date(event.date),' ',start_time)>=CURRENT_TIMESTAMP")
    .andWhere("event.state <> 4") //filtro eventos cancelados
    .andWhere("concat(eventApply.stateId,eventApply.origin) NOT IN('6O','8O')") // filtro de solicitudes rechazadas
    .orderBy("concat(date(event.date),' ',event.start_time)", "ASC")
    .getRawMany()
    
    res.status(200).json(eventList);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export async function findRegistrationTokensByEvent(eventId: string) {
  try {

    const tokenList = await getRepository(User)
      .createQueryBuilder("user")
      .select("user.mobileToken")
      .leftJoin("user.uid", "person")
      .leftJoin(Player, "player", "person.id = player.personId")
      .innerJoinAndSelect(EventApply, "apply", "player.id=apply.playerId ")
      .where('apply.eventId', { eventId: eventId })
      .getRawMany();

    return tokenList;

  } catch (error) {
    console.log(error);
  }
}

async function getPlayerOrganizerByEvent (eventId:string){
  const organizador=await getRepository(Player)
    .createQueryBuilder("player")
    .select("player")
    .leftJoin(Person,"person","player.personId=person.id")
    .leftJoin(User,"user","person.userUid=user.uid")
    .leftJoin(Event,"event","person.id=event.organizer")
    .leftJoin(Sport,"sport","event.sportId=sport.id and player.sportGenericId=sport.sportGenericId")
    .where("event.id",{id: eventId})
    .getOne()

    return organizador?.id;
}

export const filterEventSuggestedForUser=async (req: Request,res:Response)=>{
  try{  

        const addresses = await getRepository(Address)
        .createQueryBuilder("address")
        .innerJoin(Person, "person", "person.id = address.personId")
        .where('person.userUid = :uid', {uid: req.body.uid })
        .getMany()

        let filterEvents: Event[] = [];

        const person= await getRepository(Person)
        .createQueryBuilder("person")
        .leftJoinAndSelect("person.availability","availability")
        .leftJoinAndSelect("availability.day","day")
        .leftJoin("person.user", "user")
        .where('user.uid = :uid', {uid: req.body.uid })
        .getOne()

        let event= await getRepository(Event)
        .createQueryBuilder("event")
        .innerJoinAndSelect("event.sport", "sport")
        .innerJoinAndSelect("event.state", "state")
        .innerJoinAndSelect("event.periodicity", "periodicity")
        .innerJoinAndSelect("event.organizer", "organizer")
        .leftJoin(Person, "person", "event.organizerId = person.id")
        .innerJoin(Player,"player","person.id=player.personId and sport.sportGeneric=player.sportGenericId")
        .where("person.userUid <> :uid", {uid: req.body.uid })
        .andWhere("event.state <> 4") //filtro eventos cancelados
        .andWhere("concat(date(event.date),' ',start_time)>=CURRENT_TIMESTAMP")
        .andWhere('player.id NOT IN(select playerId from player_list  where eventId=event.id  union  select playerId from event_apply  where eventId=event.id ) ')
        .andWhere("(sport.capacity-(SELECT count(*) FROM player_list WHERE eventId= event.id AND stateId=9))>0")
        .andWhere("sport.sportGeneric IN (select sportGenericId from player where personId = :personId)", {personId: person?.id});

        if(req.body.sportGenericId !== null && req.body.sportGenericId !== 0){
          event.andWhere("sport.sportGeneric = :sportGenericId", {sportGenericId: req.body.sportGenericId});
        }

        if(req.body.dayId !== null && req.body.dayId !== 0){
          event.andWhere("DAYOFWEEK(DATE(event.date))= :dayId", {dayId: req.body.dayId});
        }

        if(req.body.startTime !== null && req.body.endTime !== null){
          event.andWhere("event.start_time >= :startTime", {startTime: req.body.startTime})
          .andWhere("event.end_time <= :endTime", {endTime: req.body.endTime});
        }

        if(req.body.distance !== null){
          let eventAux = null;
          let resultAux = null;
          for (let address of addresses){
            eventAux = event;
              eventAux.andWhere("(fn_calcula_distancia_por_direccion(:addressId,event.latitude,event.longitude) <= :distance)",
              {distance: req.body.distance, addressId: address.id});
              eventAux.orderBy("concat(date(event.date),' ',event.start_time)", "ASC");

              resultAux = await eventAux.getMany();

              //ACA FILTRAMOS LA LISTA CON LOS RESULTADOS ELIMINANDO LOS EVENTOS QUE TENGAN EL MISMO ID QUE EL EVENTO QUE VAMOS A PUSHEAR EN LA LISTA PARA EVITAR DUPLICAODS
             if(resultAux.length > 0){
                let filterAux = filterEvents;
                for(let result of resultAux){
                    filterEvents = filterAux.filter(element =>{
                      element.id !== result.id;
                    })
                    filterEvents.push(result);
                }
              }

          }
          res.status(200).json(resultAux);
      }else{
        event.orderBy("concat(date(event.date),' ',event.start_time)", "ASC");
        filterEvents = await event.getMany();
        res.status(200).json(filterEvents);
      }       
  }catch(error){
    console.log(error)
    res.status(400).json(error);
  }
}
