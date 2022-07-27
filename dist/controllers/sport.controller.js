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
exports.findOne = exports.findAll = void 0;
const typeorm_1 = require("typeorm");
const Sport_1 = require("../models/Sport");
const findAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sports = yield (0, typeorm_1.getRepository)(Sport_1.Sport)
            .createQueryBuilder("sport")
            .innerJoinAndSelect("sport.sportGeneric", "sportGeneric")
            .getMany();
        res.status(200).json(sports);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.findAll = findAll;
const findOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sports = yield Sport_1.Sport.findOne(req.params.id);
        res.status(200).json(sports);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.findOne = findOne;
