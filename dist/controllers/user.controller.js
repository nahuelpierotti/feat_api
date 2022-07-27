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
exports.create = exports.deleteUser = exports.update = exports.findOne = exports.findAll = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../models/User");
const findAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.User.find();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.findAll = findAll;
const findOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findOne(req.params.id);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.findOne = findOne;
const update = (req, res) => {
    res.send("update user");
};
exports.update = update;
const deleteUser = (req, res) => {
    res.send("delete user");
};
exports.deleteUser = deleteUser;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, typeorm_1.createQueryBuilder)()
            .insert()
            .into(User_1.User)
            .values({
            uid: req.body.uid,
            email: req.body.email,
            userType: 2,
            mobileToken: req.body.mobile_token,
        })
            .execute();
        res.status(200).json("Usuario creado exitosamente!");
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.create = create;
