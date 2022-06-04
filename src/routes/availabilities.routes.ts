import { Router } from "express";
import {
  findAll,
  findOne,
  create,
  update
} from "../controllers/availability.controller";

const router = Router();

router.route("/").get(findAll);

router.route("/:id").get(findOne);

router.route("/create").post(create);

router.route("/update").put(update);

export default router;