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
exports.update = exports.create = exports.findAllByUser = void 0;
const typeorm_1 = require("typeorm");
const Address_1 = require("../models/Address");
const Person_1 = require("../models/Person");
const findAllByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, typeorm_1.getRepository)(Address_1.Address)
            .createQueryBuilder("address")
            .innerJoin(Person_1.Person, "person", "person.id = address.personId")
            .where('person.userUid = :userUid', { userUid: req.params.userUid })
            .getMany();
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.findAllByUser = findAllByUser;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const address = yield (0, typeorm_1.createQueryBuilder)()
            .insert()
            .into(Address_1.Address)
            .values({
            alias: req.body.alias,
            street: req.body.street,
            number: req.body.number,
            town: req.body.town,
            zip_code: req.body.zip_code,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            person: req.body.person,
        })
            .execute();
        res.status(200).json("Direccion creada exitosamente!");
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.create = create;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const address = yield (0, typeorm_1.createQueryBuilder)()
            .update(Address_1.Address)
            .set({
            alias: req.body.alias,
            street: req.body.street,
            number: req.body.number,
            town: req.body.town,
            zip_code: req.body.zip_code,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
        }).where("address.id = :id", { id: req.body.id })
            .execute();
        res.status(200).json("Creado Exitosamente!");
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.update = update;
