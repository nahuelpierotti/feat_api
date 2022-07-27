"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const event_controller_1 = require("../controllers/event.controller");
const router = (0, express_1.Router)();
router.route("/").get(event_controller_1.findAll);
router
    .route("/getAllEventSuggestedForUser/:uid")
    .get(event_controller_1.findAllEventSuggestedForUser);
router.route("/getAllCreatedByUser/:uid").get(event_controller_1.findAllCreatedByUser);
router.route("/getAllByOrganizer/:organizer").get(event_controller_1.findAllByOrganizer);
router.route("/getAllApplied/:uid").get(event_controller_1.findAllApplied);
router.route("/getAllConfirmed/:uid").get(event_controller_1.findAllConfirmed);
router.route("/getAllByUser/:uid").get(event_controller_1.findAllByUser);
router.route("/getEventById/:id").get(event_controller_1.findOne);
router.route("/create").post(event_controller_1.create);
router.route("/setConfirmed").put(event_controller_1.setConfirmed);
router.route("/setCanceled").put(event_controller_1.setCanceled);
router.route("/getAllEventsOfTheWeek/:uid").get(event_controller_1.findAllOfTheWeek);
router.route("/getAllInvitationsForUser/:uid").get(event_controller_1.findAllInvitationsForUser);
router
    .route("/getAllConfirmedOrAppliedByUser/:uid")
    .get(event_controller_1.findAllConfirmedOrAppliedByUser);
router.route("/getfilterEventForUser").post(event_controller_1.filterEventSuggestedForUser);
router.route("/setFinalized").put(event_controller_1.setFinalized);
exports.default = router;
