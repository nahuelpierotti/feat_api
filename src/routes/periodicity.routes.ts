import { Router } from "express";
import {
  findAll,
  findOne,
  create
} from "../controllers/periodicity.controller";

const router = Router();

router.route("/").get(findAll);

router.route("/:id").get(findOne);

router.route("/create").post(create);

export default router;