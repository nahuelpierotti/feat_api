import { Router } from "express";
import {
  findOne,
  create,
  update,
  updatePersonalInformation,
  createPersonTransaction,
  setProfileImageUrl,
  findPersonByPlayerId,
} from "../controllers/person.controller";

const router = Router();

router.route("/create").post(create);

router.route("/update/").put(update);

router.route("/update_personal_information").put(updatePersonalInformation);

router.route("/getPersonByPlayerId/:id").get(findPersonByPlayerId);

router.route("/getPersonById/:uid").get(findOne);

router.route("/createPersonTransaction").post(createPersonTransaction);

router.route("/setProfileImageUrl").put(setProfileImageUrl);

export default router;
