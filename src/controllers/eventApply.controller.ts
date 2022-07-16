import { Request, Response } from "express";
import { createQueryBuilder, getRepository } from "typeorm";
import { EventApply } from "../models/EventApply";
import { Player } from "../models/Player";
import { Sport } from "../models/Sport";
import { SportGeneric } from "../models/SportGeneric";
import { Event } from "../models/Event";
import { PlayerList } from "../models/PlayerList";
import { User } from "../models/User";
import { Person } from "../models/Person";
import { sendPushToOneUser, subscribeTopic } from "../notifications";
import { State } from "../models/State";

export const create = async (req: Request, res: Response) => {
  try {
    req;
    const playerId = req.body.playerId;
    const eventId = req.body.eventId;
    const originId = req.body.origin;

    const existe = await createQueryBuilder()
      .select("eventApply.id")
      .from(EventApply, "eventApply")
      .where("eventApply.playerId = :playerId", { playerId })
      .andWhere("eventApply.eventId= :eventId", { eventId })
      .getOne();

    if (existe) {
      res.status(200).json("La Solicitud ya habia sido enviada Exitosamente!");
    } else {
      const event_apply = await createQueryBuilder()
        .insert()
        .into(EventApply)
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

    let user: User | undefined;
    let title = "";
    let description = "";

    const event: Event = await Event.findOne(eventId);

    if (originId === "O") {
      title = "Nueva invitacion a evento";
      description = `Te han invitado al evento "${
        event.name
      }".\nHorario: ${event.start_time
        .toString()
        .substring(0, 5)} - ${event.end_time.toString().substring(0, 5)}`;

      // SELECT * FROM USER JOIN PERSON ON USER.UID = PERSON.USERUID
      // JOIN PLAYER ON PERSON.ID = PLAYER.PERSONID
      // WHERE PLAYER.ID = 56
      user = await getRepository(User)
        .createQueryBuilder("user")
        .select("user.mobileToken")
        .innerJoin(Person, "person", "person.userUid = user.uid")
        .innerJoin(Player, "player", "person.id = player.personId")
        .where("player.id = :id", { id: playerId })
        .getOne();
    } else if (originId === "P") {
      title = "Nueva postulacion a evento";
      description = `Un nuevo jugador que se ha postulado al evento ${event.name}.`;
      //     SELECT * FROM user
      // join person on user.uid = person.userUid
      // join player on person.id = player.personId
      // join event_apply on player.id = event_apply.playerId
      // join event on event_apply.eventId = event.id
      // where event.id = 3 and event_apply = 'O';
      user = await getRepository(User)
        .createQueryBuilder("user")
        .select("user.mobileToken")
        .innerJoin(Person, "person", "user.uid = person.userUid")
        /*.innerJoin(Player, "player", "person.id = player.personId")
        .innerJoin(
          EventApply,
          "event_apply",
          "player.id = event_apply.playerId"
        )*/
        .innerJoin(Event, "event", "event.organizerId = person.id")
        .where("event.id = :id", { id: eventId })
        //.andWhere("event_apply.origin='O'")
        .getOne();
    }

    if (user && event) {
      sendPushToOneUser(user.mobileToken, title, description);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const getPlayerByPersonUidAndEvent = async (
  req: Request,
  res: Response
) => {
  try {
    const player = await createQueryBuilder()
      .select("player.id")
      .from(Player, "player")
      .innerJoin("player.person", "person")
      .innerJoin(SportGeneric, "sportGeneric", "player.sport=sportGeneric.id")
      .innerJoin(Sport, "sport", "sportGeneric.id=sport.sportGenericId")
      .innerJoin(Event, "event", "sport.id=event.sportId")
      .where("person.userUid = :uid", { uid: req.params.userUid })
      .andWhere("event.id= :eventId", { eventId: req.params.eventId })
      .getOneOrFail();

    res.status(200).json(player);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const getEventApply = async (req: Request, res: Response) => {
  try {
    const userUid = req.body.userUid;
    const eventId = req.body.eventId;

    const event_apply = await createQueryBuilder()
      .select("eventApply.origin")
      .addSelect("player.id")
      .from(EventApply, "eventApply")
      .innerJoin("eventApply.player", "player")
      .innerJoin("player.person", "person")
      .where("person.userUid = :userUid", { userUid })
      .andWhere("eventApply.eventId= :eventId", { eventId })
      .getOneOrFail();

    res.status(200).json(event_apply);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const setAcceptedApply = async (req: Request, res: Response) => {
  try {
    const playerId = req.body.playerId;
    const eventId = req.body.eventId;

    const event_complete = await
        createQueryBuilder()
        .select("event")
        .from(Event, "event")
        .innerJoin(State,"state","event.state=state.id")
        .where("event.id= :eventId", { eventId })
        .getRawOne();

    //console.log("Primer entrada Evento Completo: ",event_complete)
    
    if (event_complete?.event_stateId == 2) {
      //console.log("Primer if: ",event_complete?.event_stateId)
      res.status(200).json({isComplete: true});
    } else {
      //console.log("Else Primer  if: ",event_complete?.event_stateId)
      const existe = await createQueryBuilder()
        .select("eventApply")
        .from(EventApply, "eventApply")
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

        const applyUpd = await createQueryBuilder()
          .update(EventApply)
          .set({
            state: 7,
          })
          /*.where("event = :eventId", { eventId})
        .andWhere("player = :playerId",{playerId: event_apply.player})*/
          .where("id= :id", { id: existe.id })
          .execute();

        const accept_apply = await createQueryBuilder()
          .insert()
          .into(PlayerList)
          .values({
            origin: existe.origin,
            state: 9,
            event: +eventId,
            player: playerId,
            date: () => "CURRENT_TIMESTAMP",
          })
          .execute();

          const event = await
          createQueryBuilder()
          .select("event")
          .from(Event, "event")
          .innerJoin(State,"state","event.state=state.id")
          .where("event.id= :eventId", { eventId })
          .getRawOne();
        const tema = event?.event_stateId + "-" + event?.event_name.replace(/\s/g, "");

        if (existe.origin == "P") {
          //significa que el jugador solicito unirse
          const userToken = await getRepository(User)
            .createQueryBuilder("user")
            .select("user.mobileToken")
            .leftJoin(Person, "person", "user.uid=person.userUid")
            .leftJoin(Player, "player", "person.id = player.personId")
            .where("player.id = :playerId", { playerId: playerId })
            .getMany();

          userToken.forEach((user) => {
            subscribeTopic(tema, user.mobileToken.toString())
            sendPushToOneUser(
                user.mobileToken.toString(),
                "Te confirmaron en un partido",
                "El evento " +
                  event?.event_name +
                  " te confirmo en su lista de jugadores"
              )
          })
          /*if(event.event_stateId==2){
            console.log("Segundo if: ",event?.event_stateId)
            res.status(200).json({isComplete: true});
          }else{
            console.log("Else Segundo if: ",event?.event_stateId)
            res.status(200).json({isComplete: false});
          }*/
        //  res.status(200).json({isComplete: false});
        } else {
          const organizador = await getRepository(User)
            .createQueryBuilder("user")
            .select("user.mobileToken as mobileToken")
            .leftJoin(Person, "person", "user.uid=person.userUid")
            .leftJoin(Player, "player", "player.personId=person.id")
            .leftJoin(Event, "event", "person.id=event.organizerId")
            .where("event.id= :eventId", { eventId: eventId })
            .getRawOne();

          const player = await getRepository(Person)
            .createQueryBuilder("person")
            .select("person")
            .leftJoin(Player, "player", "person.id = player.personId")
            .where("player.id = :playerId", { playerId: playerId })
            .getOne();

          const nombre = player?.lastname + " " + player?.names;

          sendPushToOneUser(
            organizador.mobileToken,
            "Aceptaron tu invitacion",
            "El jugador " +
              nombre +
              " acepto tu solicitud al partido " +
              event?.event_name
          )

          if(event?.event_stateId==2){
            console.log("if Se lleno notif organiz: ",event?.event_stateId)
            sendPushToOneUser(
              organizador.mobileToken,
              "Evento Completo",
              "Se completo la lista de participantes al evento " +
                event.event_name+
              ". Podes verificar la lista de participantes y confirmar el evento."  
            )
            console.log("Entro el ultimo player ")
            //res.status(200).json({isComplete: false});
          }else{
            //console.log("Else if notif organiz: ",event?.event_stateId)
          //  res.status(200).json({isComplete: false});
          }
        }

      } else {
        res.status(400).json("No se encontro invitacion");
      }
      res.status(200).json({isComplete: false});
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const setDeniedApply = async (req: Request, res: Response) => {
  try {
    const playerId = req.body.playerId;
    const eventId = req.body.eventId;

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
    
      const playerList = await createQueryBuilder()
      .select("list")
      .from(PlayerList, "list")
      .where("list.playerId = :playerId", { playerId })
      .andWhere("list.eventId= :eventId", { eventId })
      .andWhere("list.stateId in(9,10) ")
      .getOneOrFail();
      
      if(playerList!= undefined){
          const listUpd = await createQueryBuilder()
          .update(PlayerList)
          .set({
            state: 15,
          })
          .where("id= :id", { id: playerList.id })
          .execute();

        res.status(200).json("Jugador Abandono Exitosamente!!"); 
      }else{
        res.status(200).json("Invitacion Rechazada Exitosamente!!");
      }

  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const exists = async (req: Request, res: Response) => {
  try {
    const playerId = req.params.playerId;
    const eventId = req.params.eventId;
    //const originId= req.body.origin

    const existe = await createQueryBuilder()
      .select("eventApply.id")
      .from(EventApply, "eventApply")
      .where("eventApply.playerId = :playerId", { playerId })
      .andWhere("eventApply.eventId= :eventId", { eventId })
      .getOne();

    if (existe == undefined) {
      res.status(200).json("0");
    } else {
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
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const getEvent = async (id: string) => {
  try {
    const event = await Event.findOne(id);

    return event;
  } catch (error) {
    console.log(error);
  }
};

export const getUserTokenByPlayer = async (playerId: string) => {
  const tokenList = await getRepository(User)
    .createQueryBuilder("user")
    .select("user.mobileToken")
    .leftJoin(Person, "person", "user.uid=person.userUid")
    .leftJoin(Player, "player", "person.id = player.personId")
    .where("player.id = :playerId", { playerId: playerId })
    .getRawOne();

  return tokenList;
};
