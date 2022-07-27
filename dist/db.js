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
exports.connectDatabase = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./models/User");
const UserType_1 = require("./models/UserType");
const Person_1 = require("./models/Person");
const Sport_1 = require("./models/Sport");
const Day_1 = require("./models/Day");
const Valuation_1 = require("./models/Valuation");
const Level_1 = require("./models/Level");
const Position_1 = require("./models/Position");
const Availability_1 = require("./models/Availability");
const Player_1 = require("./models/Player");
const Address_1 = require("./models/Address");
const Event_1 = require("./models/Event");
const Periodicity_1 = require("./models/Periodicity");
const State_1 = require("./models/State");
const EventApply_1 = require("./models/EventApply");
const PlayerList_1 = require("./models/PlayerList");
const EventSuggestion_1 = require("./models/EventSuggestion");
const PlayerSuggestion_1 = require("./models/PlayerSuggestion");
const SportGeneric_1 = require("./models/SportGeneric");
const PlayerEventCalification_1 = require("./models/PlayerEventCalification");
const Calification_1 = require("./models/Calification");
//const mysql = require('mysql2');
const connectDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, typeorm_1.createConnection)({
            type: "mysql",
            database: "vfkka3nbrg32ocsw",
            username: "r4385rqcgmj9zeah",
            password: "o7dadyrfff125zen",
            host: "y6aj3qju8efqj0w1.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
            port: Number(3306),
            synchronize: true,
            entities: [User_1.User, UserType_1.UserType, Person_1.Person, Sport_1.Sport, Day_1.Day, Level_1.Level, Valuation_1.Valuation,
                Position_1.Position, Availability_1.Availability, Player_1.Player, Address_1.Address, Periodicity_1.Periodicity,
                State_1.State, EventApply_1.EventApply, PlayerList_1.PlayerList, Event_1.Event, EventSuggestion_1.EventSuggestion, PlayerSuggestion_1.PlayerSuggestion,
                SportGeneric_1.SportGeneric, PlayerEventCalification_1.PlayerEventCalification, Calification_1.Calification],
            ssl: false,
        });
        console.log("Database connected");
    }
    catch (error) {
        console.log("Error connecting to database", error);
    }
});
exports.connectDatabase = connectDatabase;
