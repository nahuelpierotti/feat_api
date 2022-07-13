import { Router } from "express";
import {
  findAll,
  findOne,
  create,
  findAllByPerson,
  findAllPlayersSuggestedForEvent,
  findAllPlayersConfirmedByEvent,
  findAllPlayersAppliedByEvent,
  findAllByUser,
  setDismissedFromList,
  filterAllPlayersSuggestedForEvent
} from "../controllers/player.controller";

const router = Router();

router.route("/").get(findAll);

router.route("/:id").get(findOne);

router.route("/getAllByPerson/:personId").get(findAllByPerson);

router.route("/getAllByUser/:userUid").get(findAllByUser);

router.route("/create").post(create);

router.route("/getAllPlayersSuggestedForEvent/:eventId").get(findAllPlayersSuggestedForEvent)

router.route("/getAllConfirmedByEvent/:eventId").get(findAllPlayersConfirmedByEvent)

router.route("/getAllAppliedByEvent/:eventId").get(findAllPlayersAppliedByEvent)

router.route("/setDismissedFromList").post(setDismissedFromList);

router.route("/filterPlayersForEvent").post(filterAllPlayersSuggestedForEvent);

export default router;