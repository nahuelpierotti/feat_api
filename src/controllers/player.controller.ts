import e, { Request, Response } from "express";
import { createQueryBuilder } from "typeorm";
import { getRepository } from "typeorm";
import { EventApply } from "../models/EventApply";
import { Event } from "../models/Event";
import { Level } from "../models/Level";
import { Person } from "../models/Person";
import { Player } from "../models/Player";
import { PlayerList } from "../models/PlayerList";
import { PlayerSuggestion } from "../models/PlayerSuggestion";
import { Sport } from "../models/Sport";
import { SportGeneric } from "../models/SportGeneric";
import { Availability } from "../models/Availability";
import { Address } from "../models/Address";
import { User } from "../models/User";

export const findAll = async (req: Request, res: Response) => {
  try {
    const player = await getRepository(Player)
      .createQueryBuilder("player")
      .leftJoinAndSelect("player.person", "person")
      .leftJoinAndSelect(
        SportGeneric,
        "sportGeneric",
        "player.sport=sportGeneric.id"
      )
      .leftJoinAndSelect("player.position", "position")
      .leftJoinAndSelect("player.level", "level")
      .leftJoinAndSelect("player.valuation", "valuation")
      .getMany();

    //console.log(player);
    res.status(200).json(player);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const findAllByPerson = async (req: Request, res: Response) => {
  try {
    /*
      const pl=await getRepository(Player)
      .createQueryBuilder("player")
      .where("player.person = :personId", { personId: req.params.person})
      .getMany()

      console.log("Sugeridos usuario: "+pl)
      pl.forEach((jug) =>{ 
        const upd_qualif =  Player.query(
          'call set_player_calification(?)',[jug.id]);
          console.log("Ejecuto actualizacion calif: "+upd_qualif) 
      })
*/

    const player = await getRepository(Player)
      .createQueryBuilder("player")
      .leftJoinAndSelect("player.person", "person")
      .leftJoinAndSelect(
        SportGeneric,
        "sportGeneric",
        "player.sport=sportGeneric.id"
      )
      .leftJoinAndSelect("player.position", "position")
      .leftJoinAndSelect("player.level", "level")
      .leftJoinAndSelect("player.valuation", "valuation")
      .where("player.person = :personId", { personId: req.params.person })
      .getMany();

    res.status(200).json(player);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const findAllByUser = async (req: Request, res: Response) => {
  try {
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
      })
*/
    const player = await getRepository(Player)
      .createQueryBuilder("player")
      .leftJoinAndSelect(Person, "person", "person.id = player.personId")
      .leftJoinAndSelect("player.sport", "sportGeneric")
      .leftJoinAndSelect("player.position", "position")
      .leftJoinAndSelect("player.level", "level")
      .leftJoinAndSelect("player.valuation", "valuation")
      .where("person.userUid = :userUid", { userUid: req.params.userUid })
      .getMany();

    res.status(200).json(player);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const findOne = async (req: Request, res: Response) => {
  try {
    /*
        const upd_qualif =  Player.query(
          'call set_player_calification(?)',[req.params.id]);
          console.log("Ejecuto actualizacion calif: "+upd_qualif) 
      */

    const player = await getRepository(Player)
      .createQueryBuilder("player")
      .where("player.id = :id", { id: req.params.id })
      .leftJoinAndSelect("player.person", "person")
      .leftJoinAndSelect(
        SportGeneric,
        "sportGeneric",
        "player.sport=sportGeneric.id"
      )
      .leftJoinAndSelect("player.position", "position")
      .leftJoinAndSelect("player.level", "level")
      .leftJoinAndSelect("player.valuation", "valuation")
      .getOne();

    //console.log(player);
    res.status(200).json(player);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const player = await createQueryBuilder()
      .insert()
      .into(Player)
      .values({
        abilities: req.body.abilities,
        person: +req.body.person,
        sport: +req.body.sport,
        position: +req.body.position,
        level: +req.body.level,
        valuation: +req.body.valuation,
        calification: 50, // calificacion por default
      })
      .execute();

    console.log(player);
    res.status(200).json("Jugador Creado Exitosamente!");
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const findAllPlayersSuggestedForEvent = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await Player.query(
      "call get_players_suggested_for_event(?)",
      [req.params.eventId]
    );
    console.log(result);

    const pl = await getRepository(Player)
      .createQueryBuilder("player")
      .leftJoin(PlayerSuggestion, "sug", "player.id = sug.playerId")
      .where("sug.eventId = :id", { id: req.params.eventId })
      .getMany();

    console.log("Sugeridos usuario: " + pl);
    pl.forEach((jug) => {
      const upd_qualif = Player.query("call set_player_calification(?)", [
        jug.id,
      ]);
      console.log("Ejecuto actualizacion calif: " + upd_qualif);
    });

    const players = await getRepository(Player)
      .createQueryBuilder("player")
      .innerJoinAndSelect("player.person", "person")
      .leftJoinAndSelect("player.position", "position")
      .leftJoinAndSelect("player.level", "level")
      .leftJoinAndSelect("player.valuation", "valuation")
      .innerJoinAndSelect(PlayerSuggestion, "sug", "player.id = sug.playerId")
      .where("sug.eventId = :id", { id: req.params.eventId })
      .andWhere(
        "player.id NOT IN(select playerId from player_list  where eventId=sug.eventId  and stateId not in(11,15) union  select playerId from event_apply  where eventId=sug.eventId  and concat(origin,stateId) in('P6','P8','O8','O6') ) "
      )
      .getMany();

    console.log(players);

    res.status(200).json(players);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const filterAllPlayersSuggestedForEvent = async (
  req: Request,
  res: Response
) => {
  try {
    const distance = req.body.distance;
    const min_age = req.body.min_age;
    const max_age = req.body.max_age;

    const event = await Event.findOne(req.body.eventId);

    const organizer = await getRepository(Person)
      .createQueryBuilder("person")
      .leftJoinAndSelect(Event, "event", "event.organizerId = person.id")
      .where("event.id = :eventId", { eventId: req.body.eventId })
      .getOne();

    const sport = await getRepository(Sport)
      .createQueryBuilder("sport")
      .leftJoinAndSelect(Event, "event", "event.sportId = sport.id")
      .where("event.id = :eventId", { eventId: req.body.eventId })
      //.leftJoinAndSelect(SportGeneric,"sportGeneric","sport.sportGenericId=sportGeneric.id")
      .getOne();

    const sportGeneric = await getRepository(SportGeneric)
      .createQueryBuilder("sportGeneric")
      .leftJoinAndSelect(
        Sport,
        "sport",
        "sportGeneric.id = sport.sportGenericId"
      )
      .where("sport.id = :sportId", { sportId: sport?.id })
      .getOne();

    const players = await getRepository(Player)
      .createQueryBuilder("player")
      .innerJoinAndSelect("player.person", "person")
      .leftJoinAndSelect("player.position", "position")
      .leftJoinAndSelect(
        Availability,
        "availability",
        "person.id = availability.personId"
      )
      .leftJoinAndSelect(Address, "address", "person.id = address.personId")
      .leftJoinAndSelect(
        SportGeneric,
        "sportGeneric",
        "player.sportGenericId = sportGeneric.id"
      )
      .leftJoinAndSelect("player.level", "level")
      .leftJoinAndSelect("player.valuation", "valuation")
      .where("player.sportGenericId = :eventSport", {
        eventSport: sportGeneric?.id,
      })
      .andWhere("availability.dayId = DAYOFWEEK(DATE(:eventDay))", {
        eventDay: event?.date,
      })
      .andWhere("availability.start_time <= :eventStartTime", {
        eventStartTime: event?.start_time,
      })
      .andWhere("availability.end_time >= :eventEndTime", {
        eventEndTime: event?.end_time,
      })
      .andWhere(
        "player.id NOT IN(select playerId from player_list  where eventId= :eventId  and stateId not in(11,15) union  select playerId from event_apply  where eventId= :eventId  and concat(origin,stateId) in('P6','P8','O8','O6') ) ",
        { eventId: req.body.eventId }
      )
      .andWhere("person.id <> :organizer", { organizer: organizer?.id });

    if (distance != null) {
      players.andWhere(
        "person.id IN (select personId from address a where (fn_calcula_distancia_por_direccion(a.id,:eventLatitude,:eventLongitude) <= :distance))",
        {
          distance: distance,
          eventLatitude: event?.latitude,
          eventLongitude: event?.longitude,
        }
      );
    }

    if (min_age != null && max_age != null) {
      players
        .andWhere(
          "TIMESTAMPDIFF(YEAR, person.birth_date, CURDATE()) >= :minAge",
          { minAge: min_age }
        )
        .andWhere(
          "TIMESTAMPDIFF(YEAR, person.birth_date, CURDATE()) <= :maxAge",
          { maxAge: max_age }
        );
    }

    const result = await players.getMany();

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const findAllPlayersConfirmedByEvent = async (
  req: Request,
  res: Response
) => {
  try {
    const players = await getRepository(Player)
      .createQueryBuilder("player")
      .innerJoinAndSelect("player.person", "person")
      .leftJoinAndSelect(
        SportGeneric,
        "sportGeneric",
        "player.sport=sportGeneric.id"
      )
      .leftJoinAndSelect("player.position", "position")
      .leftJoinAndSelect("player.level", "level")
      .leftJoinAndSelect("player.valuation", "valuation")
      .innerJoinAndSelect(
        PlayerList,
        "playerlist",
        "player.id = playerlist.playerId"
      )
      .where("playerlist.eventId = :id", { id: req.params.eventId })
      .andWhere("playerlist.stateId not in(11,15) ")
      .getMany();

    res.status(200).json(players);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const findAllPlayersAppliedByEvent = async (
  req: Request,
  res: Response
) => {
  try {
    /*
          const players= await getRepository(Player)
          .createQueryBuilder("player")
          .innerJoinAndSelect("player.person", "person")
          .leftJoinAndSelect(SportGeneric,"sportGeneric","player.sport=sportGeneric.id")
          .leftJoinAndSelect("player.position", "position")
          .leftJoinAndSelect("player.level", "level")
          .leftJoinAndSelect("player.valuation", "valuation")
          .innerJoinAndSelect(EventApply, "apply", "player.id = apply.playerId")
          .where("apply.eventId = :id", { id: req.params.eventId})
          .andWhere('player.id NOT IN(select playerId from player_list  where eventId=apply.eventId  and stateId not in(11,15)) ')
          .andWhere("apply.stateId <> 8")
          .getMany()*/
    const players = await getRepository(Player)
      .createQueryBuilder("player")
      /*.select("player.id,"+
          " player.abilities,"+
            "apply.date,"+
            "person.id,"+
            "person.lastname,"+
            "person.names,"+
            "person.birth_date,"+
            "person.sex,"+
            "person.min_age,"+
            "person.max_age,"+
            "person.nickname,"+
            "person.notifications,"+
            "person.willing_distance,"+         
            "sportGeneric.id,"+  
            "sportGeneric.description,"+
            "position.id,"+
            "position.description,"+
            "level.id,"+
            "level.description,"+
            "valuation.id,"+
            "valuation.description,"+
            " CASE WHEN apply.origin ='O' THEN 'Invitado' ELSE 'Postulado' END as origin "  
            )*/
      .addSelect(
        "person.lastname," +
          "person.names," +
          "person.sex," +
          "TIMESTAMPDIFF(YEAR,person.birth_date,CURDATE()) AS age," +
          "person.nickname," +
          "position.description as position_desc," +
          "level.description as level_desc," +
          " CASE WHEN apply.origin ='O' THEN 'Invitado' ELSE 'Postulado' END as origin "
      )
      .innerJoin("player.person", "person")
      .leftJoin(SportGeneric, "sportGeneric", "player.sport=sportGeneric.id")
      .leftJoin("player.position", "position")
      .leftJoin("player.level", "level")
      .leftJoin("player.valuation", "valuation")
      .innerJoin(EventApply, "apply", "player.id = apply.playerId")
      .where("apply.eventId = :id", { id: req.params.eventId })
      .andWhere(
        "player.id NOT IN(select playerId from player_list  where eventId=apply.eventId  and stateId not in(11,15) UNION select playerId from event_apply where eventId=apply.eventId and concat(apply.origin,apply.stateId) in('O8','P8') ) "
      )
      .andWhere("apply.stateId <> 8")
      .getRawMany();

    res.status(200).json(players);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const setDismissedFromList = async (req: Request, res: Response) => {
  try {
    const playerId = req.body.playerId;
    const eventId = req.body.eventId;

    console.log("playerId: ", playerId);
    console.log("eventId: ", eventId);

    const player_list = await createQueryBuilder()
      .select("list")
      //.addSelect("player.id")
      .from(PlayerList, "list")
      /*.innerJoin("list.player","player")
      .innerJoin("player.person", "person")*/
      .where("list.playerId = :playerId", { playerId })
      .andWhere("list.eventId= :eventId", { eventId })
      .getOneOrFail();

    console.log(player_list);

    const listUpd = await createQueryBuilder()
      .update(PlayerList)
      .set({
        state: 11,
      })
      /*.where("event = :eventId", { eventId})
      .andWhere("player = :playerId",{playerId: event_apply.player})*/
      .where("id= :id", { id: player_list.id })
      .execute();

    console.log(listUpd);

    const event_apply = await createQueryBuilder()
      .select("eventApply")
      //.addSelect("player.id")
      .from(EventApply, "eventApply")
      /*.innerJoin("eventApply.player","player")
      .innerJoin("player.person", "person")*/
      .where("eventApply.playerId = :playerId", { playerId })
      .andWhere("eventApply.eventId= :eventId", { eventId })
      .getOneOrFail();

    const applyUpd = await createQueryBuilder()
      .update(EventApply)
      .set({
        state: 8,
      })
      /*.where("event = :eventId", { eventId})
      .andWhere("player = :playerId",{playerId: event_apply.player})*/
      .where("id= :id", { id: event_apply.id })
      .execute();

    res.status(200).json("Jugador Excluido Exitosamente!!");
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

/*
type ResponseUids = {
  uid: String;
  playerId: String;
};

type ResponseListUids = {
  uids: Array<ResponseUids>;
};
*/
export const getUidsByPlayers = async (req: Request, res: Response) => {
  try {
    let idPlayers: Array<Int16Array> = [];
    idPlayers = req.body.idPlayers;
    let query = "";

    console.log(idPlayers);

    idPlayers.forEach((idPlayer) => {
      query = query.concat(`${idPlayer},`);
    });

    query = query.slice(0, -1);
    console.log("Query: "+query);

    // SELECT * FROM user join person on person.userUid = user.uid
    // JOIN player on player.personId = person.id
    // WHERE player.id in (50,54);
    const result = await getRepository(User)
      .createQueryBuilder("user")
      .select("user.uid as uId,player.id as playerId")
      .innerJoin(Person, "person", "person.userUid = user.uid")
      .innerJoin(Player, "player", "player.personId = person.id")
      .where(`player.id in (${query})`)
      .getRawMany();

      res.status(200).json(result);

    /*if (result.length > 0) {
      let response: ResponseListUids;

      result.forEach((row) => {
        console.log(row);
        response.uids.push({
          uid: "0",
          playerId: "row.playerUd",
        });
        res.send(200).json(response);
      });
    }*/
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const setAbandonedFromList = async (req: Request, res: Response) => {
  try {
    const playerId = req.body.playerId;
    const eventId = req.body.eventId;

    console.log("playerId: ", playerId);
    console.log("eventId: ", eventId);

    const player_list = await createQueryBuilder()
      .select("list")
      //.addSelect("player.id")
      .from(PlayerList, "list")
      /*.innerJoin("list.player","player")
      .innerJoin("player.person", "person")*/
      .where("list.playerId = :playerId", { playerId })
      .andWhere("list.eventId= :eventId", { eventId })
      .getOneOrFail();

    console.log(player_list);

    const listUpd = await createQueryBuilder()
      .update(PlayerList)
      .set({
        state: 15,
      })
      /*.where("event = :eventId", { eventId})
      .andWhere("player = :playerId",{playerId: event_apply.player})*/
      .where("id= :id", { id: player_list.id })
      .execute();

    console.log(listUpd);

    res.status(200).json("Jugador Excluido Exitosamente!!");
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
