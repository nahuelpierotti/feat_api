import { Router } from "express";
import {
  findAll,
  findOne,
  create,
  findAllBySportGeneric
} from "../controllers/level.controller";

const router = Router();

router.route("/").get(findAll);

router.route("/:id").get(findOne);

router.route("/create").post(create);

router.route("/getAllBySportGeneric/:id").get(findAllBySportGeneric);

export default router;