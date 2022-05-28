import { Router } from "express";
import {
  findAll,
  findOne,
  create,
  findAllByOrganizer,
  findAllByUser
} from "../controllers/event.controller";

const router = Router();

router.route("/").get(findAll);

router.route("/getAllByUser/:uid").get(findAllByUser);

router.route("/getAllByOrganizer/:organizer").get(findAllByOrganizer);

router.route("/getEventById/:id").get(findOne);

router.route("/create").post(create)

export default router;

