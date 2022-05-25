import { Router } from "express";
import {
  findAll,
  findOne
} from "../controllers/availability.controller";

const router = Router();

router.route("/").get(findAll);

router.route("/:id").get(findOne);

export default router;