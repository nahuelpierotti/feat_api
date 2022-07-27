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
exports.setFinalized = exports.filterEventSuggestedForUser = exports.findRegistrationTokensByEvent = exports.findAllConfirmedOrAppliedByUser = exports.findAllInvitationsForUser = exports.findAllOfTheWeek = exports.setCanceled = exports.setConfirmed = exports.create = exports.deleteEvent = exports.update = exports.findAllEventSuggestedForUser = exports.findOne = exports.findAllByUser = exports.findAllConfirmed = exports.findAllApplied = exports.findAllCreatedByUser = exports.findAllByOrganizer = exports.findAll = void 0;
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
const Event_1 = require("../models/Event");
const EventApply_1 = require("../models/EventApply");
const EventSuggestion_1 = require("../models/EventSuggestion");
const Person_1 = require("../models/Person");
const Player_1 = require("../models/Player");
const PlayerList_1 = require("../models/PlayerList");
const Sport_1 = require("../models/Sport");
const SportGeneric_1 = require("../models/SportGeneric");
const User_1 = require("../models/User");
const notifications_1 = require("../notifications");
const findAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield (0, typeorm_2.getRepository)(Event_1.Event)
            .createQueryBuilder("event")
            .leftJoinAndSelect("event.sport", "sport")
            .leftJoinAndSelect("event.state", "state")
            .leftJoinAndSelect("event.periodicity", "periodicity")
            .leftJoinAndSelect("event.organizer", "organizer")
            .where("DATE(event.date) = CURRENT_DATE")
            .andWhere("event.state <> 4") //filtro eventos cancelados
            .getMany();
        res.status(200).json(event);
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.findAll = findAll;
const findAllByOrganizer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield (0, typeorm_2.getRepository)(Event_1.Event)
            .createQueryBuilder("event")
            .leftJoinAndSelect("event.sport", "sport")
            .leftJoinAndSelect("event.state", "state")
            .leftJoinAndSelect("event.periodicity", "periodicity")
            .leftJoinAndSelect("event.organizer", "organizer")
            .where("event.organizerId = :organizerId", {
            organizerId: req.params.organizer,
        })
            .andWhere("concat(date(event.date),' ',start_time)>=CURRENT_TIMESTAMP")
            .andWhere("event.state <> 4") //filtro eventos cancelados
            .getMany();
        res.status(200).json(event);
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.findAllByOrganizer = findAllByOrganizer;
const findAllCreatedByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield (0, typeorm_2.getRepository)(Event_1.Event)
            .createQueryBuilder("event")
            .leftJoinAndSelect("event.sport", "sport")
            .leftJoinAndSelect("event.state", "state")
            .leftJoinAndSelect("event.periodicity", "periodicity")
            .leftJoinAndSelect("event.organizer", "organizer")
            .leftJoinAndSelect(Person_1.Person, "person", "person.id = event.organizer")
            .leftJoinAndSelect(User_1.User, "user", "user.uid = person.userUid")
            .where("user.uid = :uid", { uid: req.params.uid })
            .andWhere("event.state <> 4") //filtro eventos cancelados
            .andWhere("concat(date(event.date),' ',start_time)>=CURRENT_TIMESTAMP")
            .getMany();
        res.status(200).json(event);
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.findAllCreatedByUser = findAllCreatedByUser;
const findAllApplied = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pl = yield (0, typeorm_2.getRepository)(Player_1.Player)
            .createQueryBuilder("player")
            .leftJoin(Person_1.Person, "person", "person.id=player.personId")
            .where("person.userUid = :uid", { uid: req.params.uid })
            .getMany();
        pl.forEach((jug) => {
            const upd_qualif = Player_1.Player.query("call set_player_calification(?)", [
                jug.id,
            ]);
        });
        const event = yield (0, typeorm_2.getRepository)(Event_1.Event)
            .createQueryBuilder("event")
            .innerJoinAndSelect("event.sport", "sport")
            .innerJoinAndSelect("event.state", "state")
            .innerJoinAndSelect("event.periodicity", "periodicity")
            .innerJoinAndSelect("event.organizer", "organizer")
            .innerJoin(Person_1.Person, "person", "person.id = event.organizer")
            .innerJoin(User_1.User, "user", "user.uid = person.userUid")
            .innerJoinAndSelect(Player_1.Player, "player", "player.personId = person.id")
            .innerJoinAndSelect(EventApply_1.EventApply, "apply", "apply.playerId = player.id")
            .where("user.uid = :uid", { uid: req.params.uid })
            .andWhere("event.id = apply.eventId")
            .andWhere("concat(date(event.date),' ',start_time)>=CURRENT_TIMESTAMP")
            .andWhere("event.state <> 4") //filtro eventos cancelados
            .getMany();
        res.status(200).json(event);
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.findAllApplied = findAllApplied;
const findAllConfirmed = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const event = yield (0, typeorm_2.getRepository)(Event_1.Event)
            .createQueryBuilder("event")
            .innerJoinAndSelect("event.sport", "sport")
            .innerJoinAndSelect("event.state", "state")
            .innerJoinAndSelect("event.periodicity", "periodicity")
            .innerJoinAndSelect("event.organizer", "organizer")
            .innerJoin(Person_1.Person, "person", "person.id = event.organizer")
            .innerJoin(User_1.User, "user", "user.uid = person.userUid")
            .innerJoinAndSelect(Player_1.Player, "player", "player.personId = person.id")
            .innerJoinAndSelect(PlayerList_1.PlayerList, "list", "list.playerId = player.id")
            .where("user.uid = :uid", { uid: req.params.uid })
            .andWhere("event.id = list.eventId")
            .andWhere("concat(date(event.date),' ',start_time)>=CURRENT_TIMESTAMP")
            .andWhere("event.state <> 4") //filtro eventos cancelados
            .getMany();
        res.status(200).json(event);
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.findAllConfirmed = findAllConfirmed;
const findAllByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventList = yield (0, typeorm_2.getRepository)(Event_1.Event)
            .createQueryBuilder("event")
            .innerJoinAndSelect("event.sport", "sport")
            .innerJoinAndSelect("event.state", "state")
            .innerJoinAndSelect("event.periodicity", "periodicity")
            .innerJoin("event.organizer", "organizer")
            .innerJoin(Person_1.Person, "person", "person.id = event.organizer")
            .innerJoin(User_1.User, "user", "user.uid = person.userUid")
            .innerJoin(Player_1.Player, "player", "player.personId = person.id")
            .where("user.uid = :uid", { uid: req.params.uid })
            .andWhere("player.id IN(select playerId from player_list  where eventId=event.id  union  select playerId from event_apply  where eventId=event.id ) ")
            .andWhere("concat(date(event.date),' ',start_time)>=CURRENT_TIMESTAMP")
            .andWhere("event.state <> 4") //filtro eventos cancelados
            .getMany();
        res.status(200).json(eventList);
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.findAllByUser = findAllByUser;
const findOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield (0, typeorm_2.getRepository)(Event_1.Event)
            .createQueryBuilder("event")
            .where("event.id = :id", { id: req.params.id })
            .leftJoinAndSelect("event.sport", "sport")
            .leftJoinAndSelect("sport.sportGeneric", "sportGeneric")
            .leftJoinAndSelect("event.state", "state")
            .leftJoinAndSelect("event.periodicity", "periodicity")
            .leftJoinAndSelect("event.organizer", "person")
            //.andWhere("concat(date(event.date),' ',start_time)>=CURRENT_TIMESTAMP")
            .getOne();
        res.status(200).json(event);
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.findOne = findOne;
const findAllEventSuggestedForUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            })*/
        const result = yield Event_1.Event.query("call get_events_suggested_for_user(?)", [
            req.params.uid,
        ]);
        const event = yield (0, typeorm_2.getRepository)(Event_1.Event)
            .createQueryBuilder("event")
            .innerJoinAndSelect("event.sport", "sport")
            .innerJoinAndSelect("event.state", "state")
            .innerJoinAndSelect("event.periodicity", "periodicity")
            .innerJoinAndSelect(EventSuggestion_1.EventSuggestion, "sug", "event.id = sug.eventId")
            .leftJoin(Person_1.Person, "person", "sug.personId = person.id")
            .innerJoin(Player_1.Player, "player", "person.id=player.personId and sport.sportGeneric=player.sportGenericId")
            .innerJoin(User_1.User, "user", "user.uid = person.userUid")
            .where("user.uid = :uid", { uid: req.params.uid })
            .andWhere("event.organizer <> person.id")
            .andWhere("event.id = sug.eventId")
            .andWhere("event.state not in(4,2,5) ") //filtro eventos cancelados, completos y finalizados
            .andWhere("concat(date(event.date),' ',start_time)>=CURRENT_TIMESTAMP")
            .andWhere("player.id NOT IN(select playerId from player_list  where eventId=event.id  union  select playerId from event_apply  where eventId=event.id ) ")
            .andWhere("" +
            "EXISTS( " +
            " SELECT 1 FROM address a " +
            " WHERE  a.personId=person.id " +
            "AND fn_calcula_distancia_por_direccion(a.id,event.latitude,event.longitude) <= person.willing_distance " +
            " ) ")
            .orderBy("concat(date(event.date),' ',event.start_time)", "ASC")
            .getMany();
        res.status(200).json(event);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.findAllEventSuggestedForUser = findAllEventSuggestedForUser;
const update = (req, res) => {
    res.send("update user");
};
exports.update = update;
const deleteEvent = (req, res) => {
    res.send("delete user");
};
exports.deleteEvent = deleteEvent;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield (0, typeorm_1.createQueryBuilder)()
            .insert()
            .into(Event_1.Event)
            .values({
            name: req.body.name,
            date: req.body.date,
            start_time: req.body.start_time,
            end_time: req.body.end_time,
            description: req.body.description,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            state: 1,
            sport: +req.body.sport,
            periodicity: +req.body.periodicity,
            organizer: +req.body.organizer,
            capacity: req.body.capacity,
        })
            .execute();
        const idEvento = event.raw.insertId;
        const nombre = req.body.name.replace(/\s/g, "");
        const tema = event.raw.insertId + "-" + nombre;
        const organizador = yield (0, typeorm_2.getRepository)(Player_1.Player)
            .createQueryBuilder("player")
            .select("player.id,user.mobileToken")
            .leftJoin(Person_1.Person, "person", "player.personId=person.id")
            .leftJoin(User_1.User, "user", "person.userUid=user.uid")
            .leftJoin(Event_1.Event, "event", "person.id=event.organizer")
            .innerJoin(Sport_1.Sport, "sport", "event.sportId=sport.id and player.sportGenericId=sport.sportGenericId")
            .where("person.id= :id", { id: +req.body.organizer })
            .andWhere("event.id= :eventId", { eventId: idEvento })
            .getRawOne();
        //console.log("Token List: ", organizador.mobileToken);
        if ((organizador === null || organizador === void 0 ? void 0 : organizador.id) != undefined) {
            /* A pedido del Camarada Rao
            
              subscribeTopic(tema, organizador.mobileToken.toString())
              sendPushToOneUser(
                  organizador.mobileToken.toString(),
                  "Creaste un nuevo evento",
                  "Ya podes invitar a jugadores"
                )
                
                */
            const event_apply = yield (0, typeorm_1.createQueryBuilder)()
                .insert()
                .into(EventApply_1.EventApply)
                .values({
                origin: "O",
                state: +7,
                event: +event.raw.insertId,
                player: organizador === null || organizador === void 0 ? void 0 : organizador.id,
                date: () => "CURRENT_TIMESTAMP",
            })
                .execute();
            const player_list = yield (0, typeorm_1.createQueryBuilder)()
                .insert()
                .into(PlayerList_1.PlayerList)
                .values({
                origin: "O",
                state: +9,
                event: +event.raw.insertId,
                player: organizador === null || organizador === void 0 ? void 0 : organizador.id,
                date: () => "CURRENT_TIMESTAMP",
            })
                .execute();
        }
        else {
            const organizador = yield (0, typeorm_2.getRepository)(Player_1.Player)
                .createQueryBuilder("player")
                .select("player.id,user.mobileToken")
                .leftJoin(Person_1.Person, "person", "player.personId=person.id")
                .leftJoin(User_1.User, "user", "person.userUid=user.uid")
                .where("person.id= :id", { id: +req.body.organizer })
                .getRawOne();
            (0, notifications_1.subscribeTopic)(tema, organizador.mobileToken.toString());
            (0, notifications_1.sendPushToOneUser)(organizador.mobileToken.toString(), "Creaste un nuevo evento", "Ya podes invitar a jugadores");
        }
        res.status(200).json("Evento Creado Exitosamente!");
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.create = create;
const setConfirmed = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, typeorm_1.createQueryBuilder)()
            .update(Event_1.Event)
            .set({
            state: +3,
            updated: () => "CURRENT_TIMESTAMP",
        })
            .where("id = :id", { id: req.body.id })
            .execute();
        //     SELECT * FROM user
        // join person on user.uid = person.userUid
        // join player on person.id = player.personId
        // join event_apply on player.id = event_apply.playerId
        // join event on event_apply.eventId = event.id
        // where event.stateId = 3;
        if (result.affected) {
            const users = yield (0, typeorm_2.getRepository)(User_1.User)
                .createQueryBuilder("user")
                .select("user.mobileToken")
                .innerJoin(Person_1.Person, "person", "user.uid = person.userUid")
                .innerJoin(Player_1.Player, "player", "person.id = player.personId")
                .innerJoin(EventApply_1.EventApply, "event_apply", "player.id = event_apply.playerId")
                .innerJoin(Event_1.Event, "event", "event_apply.eventId = event.id")
                .where("event.stateId = :stateId", { stateId: 3 })
                .andWhere("event_apply.stateId = 7")
                .andWhere("event.id = :id", { id: req.body.id })
                .getMany();
            const event = yield Event_1.Event.findOne(req.body.id);
            let promises = [];
            users.forEach((user) => {
                promises.push((0, notifications_1.sendPushToOneUser)(user.mobileToken, "Evento Confirmado", `Se confirmo el evento "${event.name}".\nHorario: ${event.start_time
                    .toString()
                    .substring(0, 5)} - ${event.end_time.toString().substring(0, 5)}`));
            });
            Promise.all(promises).then((resp) => {
                res.status(200).json("Evento Confirmado Exitosamente!");
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.setConfirmed = setConfirmed;
const setCanceled = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, typeorm_1.createQueryBuilder)()
            .update(Event_1.Event)
            .set({
            state: +4,
            updated: () => "CURRENT_TIMESTAMP",
        })
            .where("id = :id", { id: req.body.id })
            .execute();
        if (result.affected) {
            const users = yield (0, typeorm_2.getRepository)(User_1.User)
                .createQueryBuilder("user")
                .select("user.mobileToken")
                .innerJoin(Person_1.Person, "person", "user.uid = person.userUid")
                .innerJoin(Player_1.Player, "player", "person.id = player.personId")
                .innerJoin(EventApply_1.EventApply, "event_apply", "player.id = event_apply.playerId")
                .innerJoin(Event_1.Event, "event", "event_apply.eventId = event.id")
                .where("event.stateId = :stateId", { stateId: 4 })
                .andWhere("event_apply.stateId = 7")
                .andWhere("event.id = :id", { id: req.body.id })
                .getMany();
            const event = yield Event_1.Event.findOne(req.body.id);
            let promises = [];
            users.forEach((user) => {
                promises.push((0, notifications_1.sendPushToOneUser)(user.mobileToken, "Evento Cancelado", `Se cancelo el evento "${event.name}".\nHorario: ${event.start_time
                    .toString()
                    .substring(0, 5)} - ${event.end_time.toString().substring(0, 5)}`));
            });
            Promise.all(promises).then((resp) => {
                res.status(200).json("Evento Cancelado Exitosamente!");
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.setCanceled = setCanceled;
const findAllOfTheWeek = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uid = req.params.uid;
        const event = yield (0, typeorm_2.getRepository)(Event_1.Event)
            .createQueryBuilder("event")
            .leftJoinAndSelect("event.sport", "sport")
            .leftJoinAndSelect("event.state", "state")
            .leftJoinAndSelect("event.periodicity", "periodicity")
            .where("DATE(event.date) >= CURRENT_DATE")
            .andWhere(" DATE(event.date) <= DATE_ADD(NOW(), INTERVAL 7 DAY) ")
            .andWhere("event.state not in(4,2,5) ") //filtro eventos cancelados, completos y finalizados
            .andWhere("event.id NOT IN(" +
            " select eventId from player_list l " +
            " join player pl on l.playerId=pl.id " +
            " join person p on pl.personId=p.id " +
            " where p.userUid='" +
            uid +
            "'" +
            " and stateId in(9,10) " +
            " union " +
            " select eventId from event_apply a " +
            " join player pl on a.playerId=pl.id " +
            " join person p on pl.personId=p.id " +
            " where p.userUid='" +
            uid +
            "'" +
            " and stateId in(6,7) " +
            ") ")
            .andWhere("event.organizer <> (select distinct id from person where userUid='" +
            uid +
            "')")
            .orderBy("event.date, event.start_time ", "ASC")
            .getMany();
        res.status(200).json(event);
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.findAllOfTheWeek = findAllOfTheWeek;
const findAllInvitationsForUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield (0, typeorm_2.getRepository)(Event_1.Event)
            .createQueryBuilder("event")
            .innerJoinAndSelect("event.sport", "sport")
            .innerJoinAndSelect("event.state", "state")
            .innerJoinAndSelect("event.periodicity", "periodicity")
            .innerJoinAndSelect("event.organizer", "organizer")
            .innerJoinAndSelect(EventApply_1.EventApply, "apply", "event.id = apply.eventId")
            .innerJoin(Player_1.Player, "player", "apply.playerId=player.id")
            .innerJoin(Person_1.Person, "person", "player.personId = person.id")
            .innerJoin(User_1.User, "user", "user.uid = person.userUid")
            .where("user.uid = :uid", { uid: req.params.uid })
            .andWhere("apply.stateId = 6")
            .andWhere("apply.origin = 'O'")
            .andWhere("concat(date(event.date),' ',start_time)>=CURRENT_TIMESTAMP")
            .andWhere("event.state not in(4,2,5) ") //filtro eventos cancelados, completos y finalizados
            .orderBy("concat(date(event.date),' ',event.start_time)", "ASC")
            .getMany();
        res.status(200).json(event);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.findAllInvitationsForUser = findAllInvitationsForUser;
const findAllConfirmedOrAppliedByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const eventList = yield (0, typeorm_2.getRepository)(Event_1.Event)
            .createQueryBuilder("event")
            .select("event.id,event.name,event.date,event.start_time,event.end_time,event.latitude,event.longitude,state.description as state_desc,sport.description sport_desc,case when eventApply.stateId=6 then 'Aplicado' else 'Confirmado' end as origen," +
            " CASE WHEN event.organizer=person.id THEN true else false end as is_organizer, " +
            " CASE WHEN (select count(distinct eventId,qualifier) from calification where eventId=event.id and qualifier=eventApply.playerId )>0 THEN true ELSE false END as eventQualified ")
            .leftJoin("event.sport", "sport")
            .leftJoin("event.state", "state")
            .leftJoin("event.periodicity", "periodicity")
            .leftJoin("event.eventApply", "eventApply")
            .leftJoin(SportGeneric_1.SportGeneric, "generic", "sport.sportGeneric = generic.id")
            .leftJoin(Player_1.Player, "player", "generic.id = player.sportGenericId and eventApply.playerId=player.id")
            .leftJoin(Person_1.Person, "person", "player.personId = person.id")
            .leftJoin(User_1.User, "user", "user.uid = person.userUid")
            //.innerJoinAndSelect(EventApply,"apply", "event.id=apply.eventId and player.id=apply.playerId ")
            .where("user.uid = :uid", { uid: req.params.uid })
            //.andWhere("player.id IN(select playerId from player_list  where eventId=event.id and stateId in(9,10))")
            .andWhere("concat(date(event.date),' ',start_time)>=CURRENT_TIMESTAMP")
            .andWhere("event.state <> 4") //filtro eventos cancelados
            .andWhere("concat(eventApply.stateId,eventApply.origin) NOT IN('6O','8O','8P')") // filtro de solicitudes rechazadas
            .orderBy("concat(date(event.date),' ',event.start_time)", "ASC")
            .getRawMany();
        //  .getSql()
        res.status(200).json(eventList);
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.findAllConfirmedOrAppliedByUser = findAllConfirmedOrAppliedByUser;
function findRegistrationTokensByEvent(eventId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const tokenList = yield (0, typeorm_2.getRepository)(User_1.User)
                .createQueryBuilder("user")
                .select("user.mobileToken")
                .leftJoin("user.uid", "person")
                .leftJoin(Player_1.Player, "player", "person.id = player.personId")
                .innerJoinAndSelect(EventApply_1.EventApply, "apply", "player.id=apply.playerId ")
                .where("apply.eventId", { eventId: eventId })
                .getRawMany();
            return tokenList;
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.findRegistrationTokensByEvent = findRegistrationTokensByEvent;
function getPlayerOrganizerByEvent(eventId) {
    return __awaiter(this, void 0, void 0, function* () {
        const organizador = yield (0, typeorm_2.getRepository)(Player_1.Player)
            .createQueryBuilder("player")
            .select("player")
            .leftJoin(Person_1.Person, "person", "player.personId=person.id")
            .leftJoin(User_1.User, "user", "person.userUid=user.uid")
            .leftJoin(Event_1.Event, "event", "person.id=event.organizer")
            .leftJoin(Sport_1.Sport, "sport", "event.sportId=sport.id and player.sportGenericId=sport.sportGenericId")
            .where("event.id", { id: eventId })
            .getOne();
        return organizador === null || organizador === void 0 ? void 0 : organizador.id;
    });
}
const filterEventSuggestedForUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sportGenericId = req.body.sportGenericId;
        const dayId = req.body.dayId;
        const startTime = req.body.startTime;
        const endTime = req.body.endTime;
        const distance = req.body.distance;
        if (distance != null) {
            const result = yield Event_1.Event.query("call get_events_suggested_for_user_filter(?,?)", [req.body.uid, req.body.distance]);
        }
        let event = yield (0, typeorm_2.getRepository)(Event_1.Event)
            .createQueryBuilder("event")
            .innerJoinAndSelect("event.sport", "sport")
            .innerJoinAndSelect("event.state", "state")
            .innerJoinAndSelect("event.periodicity", "periodicity")
            .innerJoinAndSelect(EventSuggestion_1.EventSuggestion, "sug", "event.id = sug.eventId")
            .leftJoin(Person_1.Person, "person", "sug.personId = person.id")
            .innerJoin(Player_1.Player, "player", "person.id=player.personId and sport.sportGeneric=player.sportGenericId")
            .innerJoin(User_1.User, "user", "user.uid = person.userUid")
            .where("user.uid = :uid", { uid: req.body.uid })
            .andWhere("event.organizer <> person.id")
            .andWhere("event.id = sug.eventId")
            .andWhere("event.state not in(4,2,5) ") //filtro eventos cancelados, completos y finalizados
            .andWhere("concat(date(event.date),' ',start_time)>=CURRENT_TIMESTAMP")
            .andWhere("player.id NOT IN(select playerId from player_list  where eventId=event.id  union  select playerId from event_apply  where eventId=event.id ) ");
        if (sportGenericId != null ||
            dayId != null ||
            (startTime != null && endTime != null) ||
            distance != null) {
            if (sportGenericId != null) {
                event.andWhere("sport.sportGeneric = :sportGenericId", {
                    sportGenericId: sportGenericId,
                });
            }
            if (dayId != null) {
                event.andWhere("DAYOFWEEK(DATE(event.date))= :dayId", { dayId: dayId });
            }
            if (startTime != null && endTime != null) {
                event
                    .andWhere("event.start_time >= :startTime", { startTime: startTime })
                    .andWhere("event.end_time <= :endTime", { endTime: endTime });
            }
            if (distance != null) {
                event.andWhere("" +
                    "EXISTS( " +
                    " SELECT 1 FROM address a " +
                    " WHERE  a.personId=person.id " +
                    "AND fn_calcula_distancia_por_direccion(a.id,event.latitude,event.longitude) <= " +
                    distance +
                    " ) ");
            }
            event.orderBy("concat(date(event.date),' ',event.start_time)", "ASC");
        }
        else {
            event.orderBy("concat(date(event.date),' ',event.start_time)", "ASC");
        }
        const eventsFiltered = yield event.getMany();
        res.status(200).json(eventsFiltered);
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.filterEventSuggestedForUser = filterEventSuggestedForUser;
const setFinalized = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, typeorm_1.createQueryBuilder)()
            .update(Event_1.Event)
            .set({
            state: +5,
            updated: () => "CURRENT_TIMESTAMP",
        })
            .where("id = :id", { id: req.body.id })
            .execute();
        if (result.affected) {
            const users = yield (0, typeorm_2.getRepository)(User_1.User)
                .createQueryBuilder("user")
                .select("user.mobileToken")
                .innerJoin(Person_1.Person, "person", "user.uid = person.userUid")
                .innerJoin(Player_1.Player, "player", "person.id = player.personId")
                .innerJoin(PlayerList_1.PlayerList, "list", "player.id = list.playerId")
                .innerJoin(Event_1.Event, "event", "list.eventId = event.id")
                .where("event.stateId = :stateId", { stateId: 4 })
                .andWhere("list.stateId in(9,10)")
                .andWhere("event.id = :id", { id: req.body.id })
                .getMany();
            const event = yield Event_1.Event.findOne(req.body.id);
            let promises = [];
            users.forEach((user) => {
                promises.push((0, notifications_1.sendPushToOneUser)(user.mobileToken, "Evento Finalizado ", `El organizador indico que el evento "${event.name}" finalizo.\nYa podes entrar a la app para calificar a los participantes`));
            });
            Promise.all(promises).then((resp) => {
                res.status(200).json("Evento Finalizado Exitosamente!");
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.setFinalized = setFinalized;
