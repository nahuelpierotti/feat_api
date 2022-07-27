"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const periodicity_controller_1 = require("../controllers/periodicity.controller");
const router = (0, express_1.Router)();
router.route("/").get(periodicity_controller_1.findAll);
router.route("/:id").get(periodicity_controller_1.findOne);
router.route("/create").post(periodicity_controller_1.create);
exports.default = router;
