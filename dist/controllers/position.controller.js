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
exports.findAllBySportGeneric = exports.create = exports.findOne = exports.findAll = void 0;
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
const Position_1 = require("../models/Position");
const SportGeneric_1 = require("../models/SportGeneric");
const findAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const position = yield (0, typeorm_2.getRepository)(Position_1.Position)
            .createQueryBuilder("position")
            .leftJoinAndSelect(SportGeneric_1.SportGeneric, "sportGeneric", "position.sport=sportGeneric.id")
            .getMany();
        res.status(200).json(position);
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.findAll = findAll;
const findOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const position = yield (0, typeorm_2.getRepository)(Position_1.Position)
            .createQueryBuilder("position")
            .where("position.id = :id", { id: req.params.id })
            .leftJoinAndSelect(SportGeneric_1.SportGeneric, "sportGeneric", "position.sport=sportGeneric.id")
            .getOne();
        res.status(200).json(position);
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.findOne = findOne;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const position = yield (0, typeorm_1.createQueryBuilder)()
            .insert()
            .into(Position_1.Position)
            .values({
            description: req.body.description,
            sport: +req.body.sport
        })
            .execute();
        res.status(200).json("Posición Creada Exitosamente!");
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.create = create;
const findAllBySportGeneric = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const position = yield (0, typeorm_2.getRepository)(Position_1.Position)
            .createQueryBuilder("position")
            .addSelect("gen.description", "sport")
            .innerJoin(SportGeneric_1.SportGeneric, "gen", "position.sportGenericId = gen.id")
            .where("gen.id = :id", { id: req.params.id })
            .getMany();
        res.status(200).json(position);
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.findAllBySportGeneric = findAllBySportGeneric;
