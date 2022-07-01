import { Router } from "express";
import {
  findAll,
  findOne,
  create,
  findAllByOrganizer,
  findAllCreatedByUser,
  findAllApplied,
  findAllConfirmed,
  findAllByUser,
  findAllEventSuggestedForUser,
  setConfirmed,
  setCanceled,
  findAllOfTheWeek,
  findAllInvitationsForUser,
  findAllConfirmedOrAppliedByUser,
  filterEventSuggestedForUser
} from "../controllers/event.controller";

const router = Router();

router.route("/").get(findAll);

router.route("/getAllEventSuggestedForUser/:uid").get(findAllEventSuggestedForUser);

router.route("/getAllCreatedByUser/:uid").get(findAllCreatedByUser);

router.route("/getAllByOrganizer/:organizer").get(findAllByOrganizer);

router.route("/getAllApplied/:uid").get(findAllApplied);

router.route("/getAllConfirmed/:uid").get(findAllConfirmed);

router.route("/getAllByUser/:uid").get(findAllByUser);

router.route("/getEventById/:id").get(findOne);

router.route("/create").post(create)

router.route("/setConfirmed").put(setConfirmed)

router.route("/setCanceled").put(setCanceled)

router.route("/getAllEventsOfTheWeek/:uid").get(findAllOfTheWeek);

router.route("/getAllInvitationsForUser/:uid").get(findAllInvitationsForUser);

router.route("/getAllConfirmedOrAppliedByUser/:uid").get(findAllConfirmedOrAppliedByUser);

router.route("/getfilterEventSuggestedForUser/:uid").post(filterEventSuggestedForUser);

export default router;

