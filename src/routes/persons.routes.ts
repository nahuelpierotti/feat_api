import { Router } from "express";
import {
  findOne,
  create,
  update,
} from "../controllers/person.controller";

const router = Router();

router.route("/create").post(create);

router.route("/update/:id").post(update);

router.route("/getPersonById/:id").get(findOne);

export default router;
