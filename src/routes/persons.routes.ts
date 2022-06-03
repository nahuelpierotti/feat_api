import { Router } from "express";
import {
  findOne,
  create,
  update,
} from "../controllers/person.controller";

const router = Router();

router.route("/create").post(create);

router.route("/update/").put(update);

router.route("/getPersonById/:uid").get(findOne);

export default router;
