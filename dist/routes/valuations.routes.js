"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const valuation_controller_1 = require("../controllers/valuation.controller");
const router = (0, express_1.Router)();
router.route("/").get(valuation_controller_1.findAll);
exports.default = router;
