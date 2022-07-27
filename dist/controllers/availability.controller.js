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
exports.update = exports.create = exports.findOne = exports.findAll = void 0;
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
const Availability_1 = require("../models/Availability");
const findAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const availability = yield (0, typeorm_2.getRepository)(Availability_1.Availability)
            .createQueryBuilder("availability")
            .leftJoinAndSelect("availability.person", "person")
            .leftJoinAndSelect("availability.day", "day")
            .getMany();
        //;
        res.status(200).json(availability);
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.findAll = findAll;
const findOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const availability = yield (0, typeorm_2.getRepository)(Availability_1.Availability)
            .createQueryBuilder("availability")
            .where("availability.id = :id", { id: req.params.id })
            .leftJoinAndSelect("availability.person", "person")
            .leftJoinAndSelect("availability.day", "day")
            .getOne();
        //;
        res.status(200).json(availability);
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.findOne = findOne;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const start_time1 = req.body.start_time1;
        const end_time1 = req.body.end_time1;
        const start_time2 = req.body.start_time2;
        const end_time2 = req.body.end_time2;
        const start_time3 = req.body.start_time3;
        const end_time3 = req.body.end_time3;
        const start_time4 = req.body.start_time4;
        const end_time4 = req.body.end_time4;
        const start_time5 = req.body.start_time5;
        const end_time5 = req.body.end_time5;
        const start_time6 = req.body.start_time6;
        const end_time6 = req.body.end_time6;
        const start_time7 = req.body.start_time7;
        const end_time7 = req.body.end_time7;
        if (start_time1 != null && end_time1 != null) {
            const availability = yield (0, typeorm_1.createQueryBuilder)()
                .insert()
                .into(Availability_1.Availability)
                .values({
                start_time: start_time1,
                end_time: end_time1,
                person: +req.body.person,
                day: 1
            })
                .execute();
        }
        if (start_time2 != null && end_time2 != null) {
            const availability = yield (0, typeorm_1.createQueryBuilder)()
                .insert()
                .into(Availability_1.Availability)
                .values({
                start_time: start_time2,
                end_time: end_time2,
                person: +req.body.person,
                day: 2
            })
                .execute();
        }
        if (start_time3 != null && end_time3 != null) {
            const availability = yield (0, typeorm_1.createQueryBuilder)()
                .insert()
                .into(Availability_1.Availability)
                .values({
                start_time: start_time3,
                end_time: end_time3,
                person: +req.body.person,
                day: 3
            })
                .execute();
        }
        if (start_time4 != null && end_time4 != null) {
            const availability = yield (0, typeorm_1.createQueryBuilder)()
                .insert()
                .into(Availability_1.Availability)
                .values({
                start_time: start_time4,
                end_time: end_time4,
                person: +req.body.person,
                day: 4
            })
                .execute();
        }
        if (start_time5 != null && end_time5 != null) {
            const availability = yield (0, typeorm_1.createQueryBuilder)()
                .insert()
                .into(Availability_1.Availability)
                .values({
                start_time: start_time5,
                end_time: end_time5,
                person: +req.body.person,
                day: 5
            })
                .execute();
        }
        if (start_time6 != null && end_time6 != null) {
            const availability = yield (0, typeorm_1.createQueryBuilder)()
                .insert()
                .into(Availability_1.Availability)
                .values({
                start_time: start_time6,
                end_time: end_time6,
                person: +req.body.person,
                day: 6
            })
                .execute();
        }
        if (start_time7 != null && end_time7 != null) {
            const availability = yield (0, typeorm_1.createQueryBuilder)()
                .insert()
                .into(Availability_1.Availability)
                .values({
                start_time: start_time7,
                end_time: end_time7,
                person: +req.body.person,
                day: 7
            })
                .execute();
        }
        res.status(200).json("Creado Exitosamente!");
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.create = create;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const availability = yield (0, typeorm_1.createQueryBuilder)()
            .update(Availability_1.Availability)
            .set({
            start_time: req.body.start_time,
            end_time: req.body.end_time,
            day: +req.body.day
        }).where("availability.id = :id", { id: req.body.id })
            .execute();
        res.status(200).json("Creado Exitosamente!");
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.update = update;
