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
  setCanceled
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

export default router;

