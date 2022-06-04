import { createConnection } from "typeorm";
import { User } from "./models/User";
import { UserType } from "./models/UserType";
import { Person } from "./models/Person";
import { Sport } from "./models/Sport";
import { Day } from "./models/Day";
import { Valuation } from "./models/Valuation";
import { Level } from "./models/Level";
import { Position } from "./models/Position";
import { Availability } from "./models/Availability";
import { Player } from "./models/Player";
import { Address } from "./models/Address";
import { Event } from "./models/Event";
import { Periodicity } from "./models/Periodicity";
import { State } from "./models/State";
import { EventApply } from "./models/EventApply";
import { PlayerList } from "./models/PlayerList";
import { EventSuggestion } from "./models/EventSuggestion";
import { PlayerSuggestion } from "./models/PlayerSuggestion";
import { SportGeneric } from "./models/SportGeneric";


export const connectDatabase = async () => {
  try {
    await createConnection({
      type: "mysql",
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      synchronize: true,
      entities: [User, UserType, Person, Sport,Day,Level,Valuation, 
        Position,Availability,Player,Address,Periodicity,
        State,EventApply,PlayerList,Event,EventSuggestion,PlayerSuggestion, SportGeneric],
      ssl: false,
    });
    console.log("Database connected");
  } catch (error) {
    console.log("Error connecting to database", error);
  }
};
