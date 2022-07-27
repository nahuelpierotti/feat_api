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
exports.findAllByUser = exports.findAllByPlayer = exports.qualifyPlayers = void 0;
const typeorm_1 = require("typeorm");
const Calification_1 = require("../models/Calification");
const Person_1 = require("../models/Person");
const Player_1 = require("../models/Player");
const qualifyPlayers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const arrayPlayers = req.body.players;
        const eventId = +req.body.eventId;
        for (const player_calification of arrayPlayers) {
            const calification = yield (0, typeorm_1.createQueryBuilder)()
                .insert()
                .into(Calification_1.Calification)
                .values({
                event: +eventId,
                player: +player_calification.id,
                liked: player_calification.liked,
                observation: player_calification.observation,
                qualifier: player_calification.qualifier
            }).execute();
        }
        res.status(200).json("Calificaciones Enviadas Exitosamente!");
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.qualifyPlayers = qualifyPlayers;
const findAllByPlayer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, typeorm_1.getRepository)(Calification_1.Calification)
            .createQueryBuilder("calification")
            .where('calification.playerId = :playerId', { playerId: req.params.playerId })
            .getMany();
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.findAllByPlayer = findAllByPlayer;
const findAllByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, typeorm_1.getRepository)(Calification_1.Calification)
            .createQueryBuilder("calification")
            .innerJoin(Player_1.Player, "player", "calification.playerId=player.id")
            .innerJoin(Person_1.Person, "person", "player.personId=person.id")
            .where('person.userUid = :userUid', { userUid: req.params.userUid })
            .getMany();
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.findAllByUser = findAllByUser;
