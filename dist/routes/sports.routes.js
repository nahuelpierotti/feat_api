"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sport_controller_1 = require("../controllers/sport.controller");
const router = (0, express_1.Router)();
router.route("/").get(sport_controller_1.findAll);
router.route("/:id").get(sport_controller_1.findOne);
exports.default = router;
