import { Router } from "express";
import {
  findOne,
  create,
} from "../controllers/person.controller";

const router = Router();

router.route("/create").post(create);

router.route("/getPersonById:id").get(findOne);

export default router;
