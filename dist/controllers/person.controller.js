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
exports.setProfileImageUrl = exports.createPersonTransaction = exports.createPerson = exports.updatePersonalInformation = exports.update = exports.create = exports.findPersonByPlayerId = exports.findOne = void 0;
const typeorm_1 = require("typeorm");
const Address_1 = require("../models/Address");
const Availability_1 = require("../models/Availability");
const Person_1 = require("../models/Person");
const Player_1 = require("../models/Player");
const findOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const person = yield (0, typeorm_1.getRepository)(Person_1.Person)
            .createQueryBuilder("person")
            .leftJoinAndSelect("person.availability", "availability")
            .leftJoinAndSelect("availability.day", "day")
            .leftJoin("person.user", "user")
            .where("user.uid = :uid", { uid: req.params.uid })
            .getOne();
        /*
        if(person==undefined){
          const js={
              "id": 0,
              "lastname": "No",
              "names": "No",
              "birth_date": '0000-00-00T03:00:00.000Z',
              "sex": "M",
              "min_age": 0,
              "max_age": 0,
              "nickname": "no",
              "notifications": false,
              "willing_distance": 0
            }
            res.status(200).json(js);
          }
          
        */
        res.status(200).json(person);
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.findOne = findOne;
const findPersonByPlayerId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // SELECT * FROM person join player on person.id = player.personId
        const person = yield (0, typeorm_1.getRepository)(Person_1.Person)
            .createQueryBuilder("person")
            .select("person.*, player.*")
            .innerJoin(Player_1.Player, "player", "player.personId = person.id")
            .where("player.id = :id", { id: req.params.id })
            .getRawMany();
        if (person) {
            res.status(200).json(person);
        }
        else {
            res.status(400).json("Error al obtener ua persona.");
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.findPersonByPlayerId = findPersonByPlayerId;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const person = yield (0, typeorm_1.createQueryBuilder)()
            .insert()
            .into(Person_1.Person)
            .values({
            lastname: req.body.lastname,
            names: req.body.names,
            birth_date: req.body.birth_date,
            sex: req.body.sex,
            nickname: req.body.nickname,
            user: req.body.userUid,
        })
            .execute();
        res.status(200).json("Persona creada exitosamente!");
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.create = create;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const personUpd = yield (0, typeorm_1.createQueryBuilder)()
            .update(Person_1.Person)
            .set({
            min_age: +req.body.min_age,
            max_age: +req.body.max_age,
            notifications: req.body.notifications,
            willing_distance: +req.body.willing_distance,
        })
            .where("id = :id", { id: req.body.id })
            .execute();
        res.status(200).json("Actualizado Exitosamente!");
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.update = update;
const updatePersonalInformation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const personUpd = yield (0, typeorm_1.createQueryBuilder)()
            .update(Person_1.Person)
            .set({
            names: req.body.names,
            lastname: req.body.lastname,
            nickname: req.body.nickname,
            birth_date: req.body.birth_date,
            sex: req.body.sex,
        })
            .where("id = :id", { id: req.body.id })
            .execute();
        res.status(200).json("Actualizado Exitosamente!");
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.updatePersonalInformation = updatePersonalInformation;
const createPerson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const person = yield (0, typeorm_1.createQueryBuilder)()
            .insert()
            .into(Person_1.Person)
            .values({
            lastname: req.body.lastName,
            names: req.body.name,
            birth_date: req.body.dateOfBirth,
            sex: req.body.sex,
            nickname: req.body.nickname,
            user: req.body.userUid,
        })
            .execute();
        res.status(200).json(person);
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.createPerson = createPerson;
const createPersonTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = (0, typeorm_1.getConnection)();
    const queryRunner = connection.createQueryRunner();
    try {
        yield queryRunner.connect();
        yield queryRunner.startTransaction();
        const person = yield (0, typeorm_1.createQueryBuilder)()
            .insert()
            .into(Person_1.Person)
            .values({
            lastname: req.body.lastName,
            names: req.body.name,
            birth_date: req.body.dateOfBirth,
            sex: req.body.sex,
            nickname: req.body.nickname,
            user: req.body.userUid,
            min_age: req.body.minAge,
            max_age: req.body.maxAge,
            notifications: req.body.notifications,
            willing_distance: req.body.willingDistance,
        })
            .execute();
        const idPersona = person.raw.insertId;
        const address = yield (0, typeorm_1.createQueryBuilder)()
            .insert()
            .into(Address_1.Address)
            .values({
            alias: req.body.addressAlias,
            street: req.body.address,
            number: "1",
            town: "1",
            zip_code: "1",
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            person: +idPersona,
        })
            .execute();
        /* AVAILABILITY*/
        const start_time1 = req.body.startTimeSunday;
        const end_time1 = req.body.endTimeSunday;
        const start_time2 = req.body.startTimeMonday;
        const end_time2 = req.body.endTimeMonday;
        const start_time3 = req.body.startTimeTuesday;
        const end_time3 = req.body.endTimeTuesday;
        const start_time4 = req.body.startTimeWednesday;
        const end_time4 = req.body.endTimeWednesday;
        const start_time5 = req.body.startTimeThursday;
        const end_time5 = req.body.endTimeThursday;
        const start_time6 = req.body.startTimeFriday;
        const end_time6 = req.body.endTimeFriday;
        const start_time7 = req.body.startTimeSaturday;
        const end_time7 = req.body.endTimeSaturday;
        if (start_time1 != null && end_time1 != null) {
            const availability = yield (0, typeorm_1.createQueryBuilder)()
                .insert()
                .into(Availability_1.Availability)
                .values({
                start_time: start_time1,
                end_time: end_time1,
                person: +idPersona,
                day: 1,
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
                person: +idPersona,
                day: 2,
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
                person: +idPersona,
                day: 3,
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
                person: +idPersona,
                day: 4,
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
                person: +idPersona,
                day: 5,
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
                person: +idPersona,
                day: 6,
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
                person: +idPersona,
                day: 7,
            })
                .execute();
        }
        /* FIN AVAILABILITY*/
        if (req.body.idSoccer != null) {
            const player = yield (0, typeorm_1.createQueryBuilder)()
                .insert()
                .into(Player_1.Player)
                .values({
                abilities: req.body.abilitiesSoccer,
                person: +idPersona,
                sport: +req.body.idSoccer,
                position: +req.body.positionIdSoccer,
                level: +req.body.levelIdSoccer,
                valuation: +req.body.valuationIdSoccer,
            })
                .execute();
        }
        if (req.body.idBasketball != null) {
            const player = yield (0, typeorm_1.createQueryBuilder)()
                .insert()
                .into(Player_1.Player)
                .values({
                abilities: req.body.abilitiesBasketball,
                person: +idPersona,
                sport: +req.body.idBasketball,
                position: +req.body.positionIdBasketball,
                level: +req.body.levelIdBasketball,
                valuation: +req.body.valuationIdBasketball,
            })
                .execute();
        }
        if (req.body.idPadel != null) {
            const player = yield (0, typeorm_1.createQueryBuilder)()
                .insert()
                .into(Player_1.Player)
                .values({
                abilities: req.body.abilitiesPadel,
                person: +idPersona,
                sport: +req.body.idPadel,
                position: +req.body.positionIdPadel,
                level: +req.body.levelIdPadel,
                valuation: +req.body.valuationIdPadel,
                calification: 5,
            })
                .execute();
        }
        if (req.body.idTennis != null) {
            const player = yield (0, typeorm_1.createQueryBuilder)()
                .insert()
                .into(Player_1.Player)
                .values({
                abilities: req.body.abilitiesTennis,
                person: +idPersona,
                sport: +req.body.idTennis,
                position: +req.body.positionIdTennis,
                level: +req.body.levelIdTennis,
                valuation: +req.body.valuationIdTennis,
            })
                .execute();
        }
        if (req.body.idRecreationalActivity != null) {
            const player = yield (0, typeorm_1.createQueryBuilder)()
                .insert()
                .into(Player_1.Player)
                .values({
                abilities: req.body.abilitiesRecreationalActivity,
                person: +idPersona,
                sport: +req.body.idRecreationalActivity,
                position: +req.body.positionIdRecreationalActivity,
                level: +req.body.levelIdRecreationalActivity,
                valuation: +req.body.valuationIdRecreationalActivity,
            })
                .execute();
        }
        yield queryRunner.commitTransaction();
        res.status(200).json("Persona creada exitosamente!");
    }
    catch (err) {
        yield queryRunner.rollbackTransaction();
        console.log(err);
    }
    finally {
        yield queryRunner.release();
    }
});
exports.createPersonTransaction = createPersonTransaction;
const setProfileImageUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const person = yield (0, typeorm_1.getRepository)(Person_1.Person)
            .createQueryBuilder("person")
            .where("person.userUid = :uid", { uid: req.body.uId })
            .getOne();
        const personUpd = yield (0, typeorm_1.createQueryBuilder)()
            .update(Person_1.Person)
            .set({
            photo_url: req.body.photoUrl,
        })
            .where("id = :id", { id: person === null || person === void 0 ? void 0 : person.id })
            .execute();
        res.status(200).json("Foto Actualizada Exitosamente!");
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.setProfileImageUrl = setProfileImageUrl;
