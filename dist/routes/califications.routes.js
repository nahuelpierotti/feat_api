"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const calification_controller_1 = require("../controllers/calification.controller");
const router = (0, express_1.Router)();
router.route("/qualifyPlayers").post(calification_controller_1.qualifyPlayers);
router.route("/findAllByPlayer/:playerId").get(calification_controller_1.findAllByPlayer);
router.route("/findAllByUser/:userUid").get(calification_controller_1.findAllByUser);
exports.default = router;
