import { Router } from "express";
import {
  findAll,
  findGeneric,
  findOne
} from "../controllers/sport.controller";

const router = Router();

router.route("/").get(findAll);

router.route("/:id").get(findOne);

router.route("/getGenerics/").get(findGeneric);

export default router;

