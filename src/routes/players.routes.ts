import { Router } from "express";
import {
  findAll,
  findOne,
  create
} from "../controllers/player.controller";

const router = Router();

router.route("/").get(findAll);

router.route("/:id").get(findOne);

router.route("/").post(create);

export default router;