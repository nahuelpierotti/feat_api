"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const player_controller_1 = require("../controllers/player.controller");
const router = (0, express_1.Router)();
router.route("/").get(player_controller_1.findAll);
router.route("/:id").get(player_controller_1.findOne);
router.route("/getAllByPerson/:personId").get(player_controller_1.findAllByPerson);
router.route("/getAllByUser/:userUid").get(player_controller_1.findAllByUser);
router.route("/create").post(player_controller_1.create);
router
    .route("/getAllPlayersSuggestedForEvent/:eventId")
    .get(player_controller_1.findAllPlayersSuggestedForEvent);
router
    .route("/getAllConfirmedByEvent/:eventId")
    .get(player_controller_1.findAllPlayersConfirmedByEvent);
router
    .route("/getAllAppliedByEvent/:eventId")
    .get(player_controller_1.findAllPlayersAppliedByEvent);
router.route("/setDismissedFromList").post(player_controller_1.setDismissedFromList);
router.route("/filterPlayersForEvent").post(player_controller_1.filterAllPlayersSuggestedForEvent);
router.route("/getPhotoUrlsByPlayers").post(player_controller_1.getPhotoUrlsByPlayers);
exports.default = router;
