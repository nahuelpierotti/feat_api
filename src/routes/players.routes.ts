import { Router } from "express";
import {
  findAll,
  findOne,
  create,
  findAllByPerson,
  findAllPlayersSuggestedForEvent
} from "../controllers/player.controller";

const router = Router();

router.route("/").get(findAll);

router.route("/:id").get(findOne);

router.route("/getAllByPerson/:personId").get(findAllByPerson);

router.route("/create").post(create);

router.route("/getAllPlayersSuggestedForEvent/:eventId").get(findAllPlayersSuggestedForEvent)
export default router;