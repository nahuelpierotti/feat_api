"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const address_controller_1 = require("../controllers/address.controller");
const router = (0, express_1.Router)();
router.route("/:userUid").get(address_controller_1.findAllByUser);
router.route("/create").post(address_controller_1.create);
router.route("/update").put(address_controller_1.update);
exports.default = router;
