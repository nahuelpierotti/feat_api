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

const mysql = require('mysql2');

export const connectDatabase = async () => {
  try {
    await mysql.createConnection({
      type: "mysql",
      database: "feat",
      username: "doadmin_sha2",
      password: "AVNS_yEniYgRa5Lbaebs",
      host: "feat-do-user-11714103-0.b.db.ondigitalocean.com",
      port: Number(25060),
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
