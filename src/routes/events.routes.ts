import { Router } from "express";
import {
  findAll,
  findOne,
  create,
  findAllByUser
} from "../controllers/event.controller";

const router = Router();

router.route("/").get(findAll);

router.route("/getAllByUser/:organizer").get(findAllByUser);

router.route("/getEventById/:id").get(findOne);

router.route("/create").post(create)

export default router;

