"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAbandonedFromList = exports.getPhotoUrlsByPlayers = exports.setDismissedFromList = exports.findAllPlayersAppliedByEvent = exports.findAllPlayersConfirmedByEvent = exports.filterAllPlayersSuggestedForEvent = exports.findAllPlayersSuggestedForEvent = exports.create = exports.findOne = exports.findAllByUser = exports.findAllByPerson = exports.findAll = void 0;
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
const EventApply_1 = require("../models/EventApply");
const Event_1 = require("../models/Event");
const Person_1 = require("../models/Person");
const Player_1 = require("../models/Player");
const PlayerList_1 = require("../models/PlayerList");
const PlayerSuggestion_1 = require("../models/PlayerSuggestion");
const Sport_1 = require("../models/Sport");
const SportGeneric_1 = require("../models/SportGeneric");
const Availability_1 = require("../models/Availability");
const Address_1 = require("../models/Address");
const User_1 = require("../models/User");
const findAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const player = yield (0, typeorm_2.getRepository)(Player_1.Player)
            .createQueryBuilder("player")
            .leftJoinAndSelect("player.person", "person")
            .leftJoinAndSelect(SportGeneric_1.SportGeneric, "sportGeneric", "player.sport=sportGeneric.id")
            .leftJoinAndSelect("player.position", "position")
            .leftJoinAndSelect("player.level", "level")
            .leftJoinAndSelect("player.valuation", "valuation")
            .getMany();
        res.status(200).json(player);
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.findAll = findAll;
const findAllByPerson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const player = yield (0, typeorm_2.getRepository)(Player_1.Player)
            .createQueryBuilder("player")
            .leftJoinAndSelect("player.person", "person")
            .leftJoinAndSelect(SportGeneric_1.SportGeneric, "sportGeneric", "player.sport=sportGeneric.id")
            .leftJoinAndSelect("player.position", "position")
            .leftJoinAndSelect("player.level", "level")
            .leftJoinAndSelect("player.valuation", "valuation")
            .where("player.person = :personId", { personId: req.params.person })
            .getMany();
        res.status(200).json(player);
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.findAllByPerson = findAllByPerson;
const findAllByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const player = yield (0, typeorm_2.getRepository)(Player_1.Player)
            .createQueryBuilder("player")
            .leftJoinAndSelect(Person_1.Person, "person", "person.id = player.personId")
            .leftJoinAndSelect("player.sport", "sportGeneric")
            .leftJoinAndSelect("player.position", "position")
            .leftJoinAndSelect("player.level", "level")
            .leftJoinAndSelect("player.valuation", "valuation")
            .where("person.userUid = :userUid", { userUid: req.params.userUid })
            .getMany();
        res.status(200).json(player);
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.findAllByUser = findAllByUser;
const findOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /*
            const upd_qualif =  Player.query(
              'call set_player_calification(?)',[req.params.id]);
              console.log("Ejecuto actualizacion calif: "+upd_qualif)
          */
        const player = yield (0, typeorm_2.getRepository)(Player_1.Player)
            .createQueryBuilder("player")
            .where("player.id = :id", { id: req.params.id })
            .leftJoinAndSelect("player.person", "person")
            .leftJoinAndSelect(SportGeneric_1.SportGeneric, "sportGeneric", "player.sport=sportGeneric.id")
            .leftJoinAndSelect("player.position", "position")
            .leftJoinAndSelect("player.level", "level")
            .leftJoinAndSelect("player.valuation", "valuation")
            .getOne();
        //console.log(player);
        res.status(200).json(player);
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.findOne = findOne;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const player = yield (0, typeorm_1.createQueryBuilder)()
            .insert()
            .into(Player_1.Player)
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
        res.status(200).json("Jugador Creado Exitosamente!");
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.create = create;
const findAllPlayersSuggestedForEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield Player_1.Player.query("call get_players_suggested_for_event(?)", [req.params.eventId]);
        const pl = yield (0, typeorm_2.getRepository)(Player_1.Player)
            .createQueryBuilder("player")
            .leftJoin(PlayerSuggestion_1.PlayerSuggestion, "sug", "player.id = sug.playerId")
            .where("sug.eventId = :id", { id: req.params.eventId })
            .orderBy("player.calification", "ASC")
            .getMany();
        let upds = [];
        pl.forEach((jug) => {
            /*const upd_qualif = Player.query("call set_player_calification(?)", [
              jug.id,
            ]);*/
            upds.push(Player_1.Player.query("call set_player_calification(?)", [
                jug.id,
            ]));
            //console.log("Player Sug Ejecuto actualizacion calif: " + jug.id);
        });
        /*Promise.all(upds).then(
          res=> console.log("Player Sug Upd Calification: "+res)
        ).catch(e=> console.log(e))
    */
        const players = yield (0, typeorm_2.getRepository)(Player_1.Player)
            .createQueryBuilder("player")
            .innerJoinAndSelect("player.person", "person")
            .leftJoinAndSelect("player.position", "position")
            .leftJoinAndSelect("player.level", "level")
            .leftJoinAndSelect("player.valuation", "valuation")
            .innerJoinAndSelect(PlayerSuggestion_1.PlayerSuggestion, "sug", "player.id = sug.playerId")
            .where("sug.eventId = :id", { id: req.params.eventId })
            .andWhere("player.id NOT IN(select playerId from player_list  where eventId=sug.eventId  and stateId not in(11,15) union  select playerId from event_apply  where eventId=sug.eventId  and concat(origin,stateId) in('P6','P8','O8','O6') ) ")
            .getMany();
        res.status(200).json(players);
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.findAllPlayersSuggestedForEvent = findAllPlayersSuggestedForEvent;
const filterAllPlayersSuggestedForEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const distance = req.body.distance;
        const min_age = req.body.min_age;
        const max_age = req.body.max_age;
        const event = yield Event_1.Event.findOne(req.body.eventId);
        const organizer = yield (0, typeorm_2.getRepository)(Person_1.Person)
            .createQueryBuilder("person")
            .leftJoinAndSelect(Event_1.Event, "event", "event.organizerId = person.id")
            .where("event.id = :eventId", { eventId: req.body.eventId })
            .getOne();
        const sport = yield (0, typeorm_2.getRepository)(Sport_1.Sport)
            .createQueryBuilder("sport")
            .leftJoinAndSelect(Event_1.Event, "event", "event.sportId = sport.id")
            .where("event.id = :eventId", { eventId: req.body.eventId })
            //.leftJoinAndSelect(SportGeneric,"sportGeneric","sport.sportGenericId=sportGeneric.id")
            .getOne();
        const sportGeneric = yield (0, typeorm_2.getRepository)(SportGeneric_1.SportGeneric)
            .createQueryBuilder("sportGeneric")
            .leftJoinAndSelect(Sport_1.Sport, "sport", "sportGeneric.id = sport.sportGenericId")
            .where("sport.id = :sportId", { sportId: sport === null || sport === void 0 ? void 0 : sport.id })
            .getOne();
        const players = yield (0, typeorm_2.getRepository)(Player_1.Player)
            .createQueryBuilder("player")
            .innerJoinAndSelect("player.person", "person")
            .leftJoinAndSelect("player.position", "position")
            .leftJoinAndSelect(Availability_1.Availability, "availability", "person.id = availability.personId")
            .leftJoinAndSelect(Address_1.Address, "address", "person.id = address.personId")
            .leftJoinAndSelect(SportGeneric_1.SportGeneric, "sportGeneric", "player.sportGenericId = sportGeneric.id")
            .leftJoinAndSelect("player.level", "level")
            .leftJoinAndSelect("player.valuation", "valuation")
            .where("player.sportGenericId = :eventSport", {
            eventSport: sportGeneric === null || sportGeneric === void 0 ? void 0 : sportGeneric.id,
        })
            .andWhere("availability.dayId = DAYOFWEEK(DATE(:eventDay))", {
            eventDay: event === null || event === void 0 ? void 0 : event.date,
        })
            .andWhere("availability.start_time <= :eventStartTime", {
            eventStartTime: event === null || event === void 0 ? void 0 : event.start_time,
        })
            .andWhere("availability.end_time >= :eventEndTime", {
            eventEndTime: event === null || event === void 0 ? void 0 : event.end_time,
        })
            .andWhere("player.id NOT IN(select playerId from player_list  where eventId= :eventId  and stateId not in(11,15) union  select playerId from event_apply  where eventId= :eventId  and concat(origin,stateId) in('P6','P8','O8','O6') ) ", { eventId: req.body.eventId })
            .andWhere("person.id <> :organizer", { organizer: organizer === null || organizer === void 0 ? void 0 : organizer.id });
        if (distance != null) {
            players.andWhere("person.id IN (select personId from address a where (fn_calcula_distancia_por_direccion(a.id,:eventLatitude,:eventLongitude) <= :distance))", {
                distance: distance,
                eventLatitude: event === null || event === void 0 ? void 0 : event.latitude,
                eventLongitude: event === null || event === void 0 ? void 0 : event.longitude,
            });
        }
        if (min_age != null && max_age != null) {
            players
                .andWhere("TIMESTAMPDIFF(YEAR, person.birth_date, CURDATE()) >= :minAge", { minAge: min_age })
                .andWhere("TIMESTAMPDIFF(YEAR, person.birth_date, CURDATE()) <= :maxAge", { maxAge: max_age });
        }
        const result = yield players.getMany();
        res.status(200).json(result);
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.filterAllPlayersSuggestedForEvent = filterAllPlayersSuggestedForEvent;
const findAllPlayersConfirmedByEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const players = yield (0, typeorm_2.getRepository)(Player_1.Player)
            .createQueryBuilder("player")
            .innerJoinAndSelect("player.person", "person")
            .leftJoinAndSelect(SportGeneric_1.SportGeneric, "sportGeneric", "player.sport=sportGeneric.id")
            .leftJoinAndSelect("player.position", "position")
            .leftJoinAndSelect("player.level", "level")
            .leftJoinAndSelect("player.valuation", "valuation")
            .innerJoinAndSelect(PlayerList_1.PlayerList, "playerlist", "player.id = playerlist.playerId")
            .where("playerlist.eventId = :id", { id: req.params.eventId })
            .andWhere("playerlist.stateId not in(11,15) ")
            .getMany();
        res.status(200).json(players);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.findAllPlayersConfirmedByEvent = findAllPlayersConfirmedByEvent;
const findAllPlayersAppliedByEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const players = yield (0, typeorm_2.getRepository)(Player_1.Player)
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
            .addSelect("person.lastname," +
            "person.names," +
            "person.sex," +
            "TIMESTAMPDIFF(YEAR,person.birth_date,CURDATE()) AS age," +
            "person.nickname," +
            "position.description as position_desc," +
            "level.description as level_desc," +
            " CASE WHEN apply.origin ='O' THEN 'Invitado' ELSE 'Postulado' END as origin ")
            .innerJoin("player.person", "person")
            .leftJoin(SportGeneric_1.SportGeneric, "sportGeneric", "player.sport=sportGeneric.id")
            .leftJoin("player.position", "position")
            .leftJoin("player.level", "level")
            .leftJoin("player.valuation", "valuation")
            .innerJoin(EventApply_1.EventApply, "apply", "player.id = apply.playerId")
            .where("apply.eventId = :id", { id: req.params.eventId })
            .andWhere("player.id NOT IN(select playerId from player_list  where eventId=apply.eventId  and stateId not in(11,15) UNION select playerId from event_apply where eventId=apply.eventId and concat(apply.origin,apply.stateId) in('O8','P8') ) ")
            .andWhere("apply.stateId <> 8")
            .getRawMany();
        res.status(200).json(players);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.findAllPlayersAppliedByEvent = findAllPlayersAppliedByEvent;
const setDismissedFromList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const playerId = req.body.playerId;
        const eventId = req.body.eventId;
        const player_list = yield (0, typeorm_1.createQueryBuilder)()
            .select("list")
            //.addSelect("player.id")
            .from(PlayerList_1.PlayerList, "list")
            /*.innerJoin("list.player","player")
            .innerJoin("player.person", "person")*/
            .where("list.playerId = :playerId", { playerId })
            .andWhere("list.eventId= :eventId", { eventId })
            .getOneOrFail();
        const listUpd = yield (0, typeorm_1.createQueryBuilder)()
            .update(PlayerList_1.PlayerList)
            .set({
            state: 11,
        })
            /*.where("event = :eventId", { eventId})
            .andWhere("player = :playerId",{playerId: event_apply.player})*/
            .where("id= :id", { id: player_list.id })
            .execute();
        const event_apply = yield (0, typeorm_1.createQueryBuilder)()
            .select("eventApply")
            //.addSelect("player.id")
            .from(EventApply_1.EventApply, "eventApply")
            /*.innerJoin("eventApply.player","player")
            .innerJoin("player.person", "person")*/
            .where("eventApply.playerId = :playerId", { playerId })
            .andWhere("eventApply.eventId= :eventId", { eventId })
            .getOneOrFail();
        const applyUpd = yield (0, typeorm_1.createQueryBuilder)()
            .update(EventApply_1.EventApply)
            .set({
            state: 8,
        })
            /*.where("event = :eventId", { eventId})
            .andWhere("player = :playerId",{playerId: event_apply.player})*/
            .where("id= :id", { id: event_apply.id })
            .execute();
        res.status(200).json("Jugador Excluido Exitosamente!!");
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.setDismissedFromList = setDismissedFromList;
/*
type ResponseUids = {
  uid: String;
  playerId: String;
};

type ResponseListUids = {
  uids: Array<ResponseUids>;
};
*/
const getPhotoUrlsByPlayers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let idPlayers = [];
        idPlayers = req.body.idPlayers;
        let query = "";
        idPlayers.forEach((idPlayer) => {
            query = query.concat(`${idPlayer},`);
        });
        query = query.slice(0, -1);
        // SELECT * FROM user join person on person.userUid = user.uid
        // JOIN player on player.personId = person.id
        // WHERE player.id in (50,54);
        const result = yield (0, typeorm_2.getRepository)(User_1.User)
            .createQueryBuilder("user")
            .select("person.photo_url photoUrl ,player.id as playerId")
            .innerJoin(Person_1.Person, "person", "person.userUid = user.uid")
            .innerJoin(Player_1.Player, "player", "player.personId = person.id")
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
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.getPhotoUrlsByPlayers = getPhotoUrlsByPlayers;
const setAbandonedFromList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const playerId = req.body.playerId;
        const eventId = req.body.eventId;
        const player_list = yield (0, typeorm_1.createQueryBuilder)()
            .select("list")
            //.addSelect("player.id")
            .from(PlayerList_1.PlayerList, "list")
            /*.innerJoin("list.player","player")
            .innerJoin("player.person", "person")*/
            .where("list.playerId = :playerId", { playerId })
            .andWhere("list.eventId= :eventId", { eventId })
            .getOneOrFail();
        const listUpd = yield (0, typeorm_1.createQueryBuilder)()
            .update(PlayerList_1.PlayerList)
            .set({
            state: 15,
        })
            /*.where("event = :eventId", { eventId})
            .andWhere("player = :playerId",{playerId: event_apply.player})*/
            .where("id= :id", { id: player_list.id })
            .execute();
        res.status(200).json("Jugador Excluido Exitosamente!!");
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.setAbandonedFromList = setAbandonedFromList;
