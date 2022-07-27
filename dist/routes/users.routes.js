"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
router.route("/create").post(user_controller_1.create);
router.route("/:id").get(user_controller_1.findOne).put(user_controller_1.update).delete(user_controller_1.deleteUser);
exports.default = router;
