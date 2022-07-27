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
exports.getUserTokenByPlayer = exports.getEvent = exports.exists = exports.setDeniedApply = exports.setAcceptedApply = exports.getEventApply = exports.getPlayerByPersonUidAndEvent = exports.create = void 0;
const typeorm_1 = require("typeorm");
const EventApply_1 = require("../models/EventApply");
const Player_1 = require("../models/Player");
const Sport_1 = require("../models/Sport");
const SportGeneric_1 = require("../models/SportGeneric");
const Event_1 = require("../models/Event");
const PlayerList_1 = require("../models/PlayerList");
const User_1 = require("../models/User");
const Person_1 = require("../models/Person");
const notifications_1 = require("../notifications");
const State_1 = require("../models/State");
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req;
        const playerId = req.body.playerId;
        const eventId = req.body.eventId;
        const originId = req.body.origin;
        const existe = yield (0, typeorm_1.createQueryBuilder)()
            .select("eventApply.id")
            .from(EventApply_1.EventApply, "eventApply")
            .where("eventApply.playerId = :playerId", { playerId })
            .andWhere("eventApply.eventId= :eventId", { eventId })
            .getOne();
        if (existe) {
            res.status(200).json("La Solicitud ya habia sido enviada Exitosamente!");
        }
        else {
            const event_apply = yield (0, typeorm_1.createQueryBuilder)()
                .insert()
                .into(EventApply_1.EventApply)
                .values({
                origin: originId,
                state: +6,
                event: +eventId,
                player: +playerId,
                date: () => "CURRENT_TIMESTAMP",
            })
                .execute();
            res.status(200).json("Solicitud Enviada Exitosamente!");
        }
        let user;
        let title = "";
        let description = "";
        const event = yield Event_1.Event.findOne(eventId);
        if (originId === "O") {
            title = "Nueva invitacion a evento";
            description = `Te han invitado al evento "${event.name}".\nHorario: ${event.start_time
                .toString()
                .substring(0, 5)} - ${event.end_time.toString().substring(0, 5)}`;
            // SELECT * FROM USER JOIN PERSON ON USER.UID = PERSON.USERUID
            // JOIN PLAYER ON PERSON.ID = PLAYER.PERSONID
            // WHERE PLAYER.ID = 56
            user = yield (0, typeorm_1.getRepository)(User_1.User)
                .createQueryBuilder("user")
                .select("user.mobileToken")
                .innerJoin(Person_1.Person, "person", "person.userUid = user.uid")
                .innerJoin(Player_1.Player, "player", "person.id = player.personId")
                .where("player.id = :id", { id: playerId })
                .getOne();
        }
        else if (originId === "P") {
            title = "Nueva postulacion a evento";
            description = `Un nuevo jugador que se ha postulado al evento ${event.name}.`;
            //     SELECT * FROM user
            // join person on user.uid = person.userUid
            // join player on person.id = player.personId
            // join event_apply on player.id = event_apply.playerId
            // join event on event_apply.eventId = event.id
            // where event.id = 3 and event_apply = 'O';
            user = yield (0, typeorm_1.getRepository)(User_1.User)
                .createQueryBuilder("user")
                .select("user.mobileToken")
                .innerJoin(Person_1.Person, "person", "user.uid = person.userUid")
                /*.innerJoin(Player, "player", "person.id = player.personId")
                .innerJoin(
                  EventApply,
                  "event_apply",
                  "player.id = event_apply.playerId"
                )*/
                .innerJoin(Event_1.Event, "event", "event.organizerId = person.id")
                .where("event.id = :id", { id: eventId })
                //.andWhere("event_apply.origin='O'")
                .getOne();
        }
        if (user && event) {
            (0, notifications_1.sendPushToOneUser)(user.mobileToken, title, description);
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.create = create;
const getPlayerByPersonUidAndEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const player = yield (0, typeorm_1.createQueryBuilder)()
            .select("player.id")
            .from(Player_1.Player, "player")
            .innerJoin("player.person", "person")
            .innerJoin(SportGeneric_1.SportGeneric, "sportGeneric", "player.sport=sportGeneric.id")
            .innerJoin(Sport_1.Sport, "sport", "sportGeneric.id=sport.sportGenericId")
            .innerJoin(Event_1.Event, "event", "sport.id=event.sportId")
            .where("person.userUid = :uid", { uid: req.params.userUid })
            .andWhere("event.id= :eventId", { eventId: req.params.eventId })
            .getOneOrFail();
        res.status(200).json(player);
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.getPlayerByPersonUidAndEvent = getPlayerByPersonUidAndEvent;
const getEventApply = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userUid = req.body.userUid;
        const eventId = req.body.eventId;
        const event_apply = yield (0, typeorm_1.createQueryBuilder)()
            .select("eventApply.origin")
            .addSelect("player.id")
            .from(EventApply_1.EventApply, "eventApply")
            .innerJoin("eventApply.player", "player")
            .innerJoin("player.person", "person")
            .where("person.userUid = :userUid", { userUid })
            .andWhere("eventApply.eventId= :eventId", { eventId })
            .getOneOrFail();
        res.status(200).json(event_apply);
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.getEventApply = getEventApply;
const setAcceptedApply = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const playerId = req.body.playerId;
        const eventId = req.body.eventId;
        const event_complete = yield (0, typeorm_1.createQueryBuilder)()
            .select("event")
            .from(Event_1.Event, "event")
            .innerJoin(State_1.State, "state", "event.state=state.id")
            .where("event.id= :eventId", { eventId })
            .getRawOne();
        //console.log("Primer entrada Evento Completo: ",event_complete)
        if ((event_complete === null || event_complete === void 0 ? void 0 : event_complete.event_stateId) == 2) {
            //console.log("Primer if: ",event_complete?.event_stateId)
            res.status(200).json({ isComplete: true });
        }
        else {
            //console.log("Else Primer  if: ",event_complete?.event_stateId)
            const existe = yield (0, typeorm_1.createQueryBuilder)()
                .select("eventApply")
                .from(EventApply_1.EventApply, "eventApply")
                .where("eventApply.playerId = :playerId", { playerId })
                .andWhere("eventApply.eventId= :eventId", { eventId })
                .getOne();
            if (existe != undefined) {
                /*const event_apply = await createQueryBuilder()
                  .select("eventApply")
                  .from(EventApply, "eventApply")
                  .where("eventApply.playerId = :playerId", { playerId })
                  .andWhere("eventApply.eventId= :eventId", { eventId })
                  .getOneOrFail();*/
                const applyUpd = yield (0, typeorm_1.createQueryBuilder)()
                    .update(EventApply_1.EventApply)
                    .set({
                    state: 7,
                })
                    /*.where("event = :eventId", { eventId})
                  .andWhere("player = :playerId",{playerId: event_apply.player})*/
                    .where("id= :id", { id: existe.id })
                    .execute();
                const accept_apply = yield (0, typeorm_1.createQueryBuilder)()
                    .insert()
                    .into(PlayerList_1.PlayerList)
                    .values({
                    origin: existe.origin,
                    state: 9,
                    event: +eventId,
                    player: playerId,
                    date: () => "CURRENT_TIMESTAMP",
                })
                    .execute();
                const event = yield (0, typeorm_1.createQueryBuilder)()
                    .select("event")
                    .from(Event_1.Event, "event")
                    .innerJoin(State_1.State, "state", "event.state=state.id")
                    .where("event.id= :eventId", { eventId })
                    .getRawOne();
                const tema = (event === null || event === void 0 ? void 0 : event.event_stateId) + "-" + (event === null || event === void 0 ? void 0 : event.event_name.replace(/\s/g, ""));
                if (existe.origin == "P") {
                    //significa que el jugador solicito unirse
                    const userToken = yield (0, typeorm_1.getRepository)(User_1.User)
                        .createQueryBuilder("user")
                        .select("user.mobileToken")
                        .leftJoin(Person_1.Person, "person", "user.uid=person.userUid")
                        .leftJoin(Player_1.Player, "player", "person.id = player.personId")
                        .where("player.id = :playerId", { playerId: playerId })
                        .getMany();
                    userToken.forEach((user) => {
                        (0, notifications_1.subscribeTopic)(tema, user.mobileToken.toString());
                        (0, notifications_1.sendPushToOneUser)(user.mobileToken.toString(), "Te confirmaron en un partido", "El evento " +
                            (event === null || event === void 0 ? void 0 : event.event_name) +
                            " te confirmo en su lista de jugadores");
                    });
                    /*if(event.event_stateId==2){
                      console.log("Segundo if: ",event?.event_stateId)
                      res.status(200).json({isComplete: true});
                    }else{
                      console.log("Else Segundo if: ",event?.event_stateId)
                      res.status(200).json({isComplete: false});
                    }*/
                    //  res.status(200).json({isComplete: false});
                }
                else {
                    const organizador = yield (0, typeorm_1.getRepository)(User_1.User)
                        .createQueryBuilder("user")
                        .select("user.mobileToken as mobileToken")
                        .leftJoin(Person_1.Person, "person", "user.uid=person.userUid")
                        .leftJoin(Player_1.Player, "player", "player.personId=person.id")
                        .leftJoin(Event_1.Event, "event", "person.id=event.organizerId")
                        .where("event.id= :eventId", { eventId: eventId })
                        .getRawOne();
                    const player = yield (0, typeorm_1.getRepository)(Person_1.Person)
                        .createQueryBuilder("person")
                        .select("person")
                        .leftJoin(Player_1.Player, "player", "person.id = player.personId")
                        .where("player.id = :playerId", { playerId: playerId })
                        .getOne();
                    const nombre = (player === null || player === void 0 ? void 0 : player.lastname) + " " + (player === null || player === void 0 ? void 0 : player.names);
                    (0, notifications_1.sendPushToOneUser)(organizador.mobileToken, "Aceptaron tu invitacion", "El jugador " +
                        nombre +
                        " acepto tu solicitud al partido " +
                        (event === null || event === void 0 ? void 0 : event.event_name));
                    if ((event === null || event === void 0 ? void 0 : event.event_stateId) == 2) {
                        console.log("if Se lleno notif organiz: ", event === null || event === void 0 ? void 0 : event.event_stateId);
                        (0, notifications_1.sendPushToOneUser)(organizador.mobileToken, "Evento Completo", "Se completo la lista de participantes al evento " +
                            event.event_name +
                            ". Podes verificar la lista de participantes y confirmar el evento.");
                        console.log("Entro el ultimo player ");
                        //res.status(200).json({isComplete: false});
                    }
                    else {
                        //console.log("Else if notif organiz: ",event?.event_stateId)
                        //  res.status(200).json({isComplete: false});
                    }
                }
            }
            else {
                res.status(400).json("No se encontro invitacion");
            }
            res.status(200).json({ isComplete: false });
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.setAcceptedApply = setAcceptedApply;
const setDeniedApply = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const playerId = req.body.playerId;
        const eventId = req.body.eventId;
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
        const playerList = yield (0, typeorm_1.createQueryBuilder)()
            .select("list")
            .from(PlayerList_1.PlayerList, "list")
            .where("list.playerId = :playerId", { playerId })
            .andWhere("list.eventId= :eventId", { eventId })
            .andWhere("list.stateId in(9,10) ")
            .getOneOrFail();
        if (playerList != undefined) {
            const listUpd = yield (0, typeorm_1.createQueryBuilder)()
                .update(PlayerList_1.PlayerList)
                .set({
                state: 15,
            })
                .where("id= :id", { id: playerList.id })
                .execute();
            res.status(200).json("Jugador Abandono Exitosamente!!");
        }
        else {
            res.status(200).json("Invitacion Rechazada Exitosamente!!");
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.setDeniedApply = setDeniedApply;
const exists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const playerId = req.params.playerId;
        const eventId = req.params.eventId;
        //const originId= req.body.origin
        const existe = yield (0, typeorm_1.createQueryBuilder)()
            .select("eventApply.id")
            .from(EventApply_1.EventApply, "eventApply")
            .where("eventApply.playerId = :playerId", { playerId })
            .andWhere("eventApply.eventId= :eventId", { eventId })
            .getOne();
        if (existe == undefined) {
            res.status(200).json("0");
        }
        else {
            /*
            const event_apply= await
            createQueryBuilder()
            .insert()
            .into(EventApply)
            .values({
                origin: originId,
                state: + 6,
                event: + eventId,
                player: + playerId,
                date: () => 'CURRENT_TIMESTAMP'
              }).execute()
            
              console.log(event_apply)*/
            res.status(200).json(existe);
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.exists = exists;
const getEvent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield Event_1.Event.findOne(id);
        return event;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getEvent = getEvent;
const getUserTokenByPlayer = (playerId) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenList = yield (0, typeorm_1.getRepository)(User_1.User)
        .createQueryBuilder("user")
        .select("user.mobileToken")
        .leftJoin(Person_1.Person, "person", "user.uid=person.userUid")
        .leftJoin(Player_1.Player, "player", "person.id = player.personId")
        .where("player.id = :playerId", { playerId: playerId })
        .getRawOne();
    return tokenList;
});
exports.getUserTokenByPlayer = getUserTokenByPlayer;
