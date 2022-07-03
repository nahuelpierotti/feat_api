import { Router } from "express";
import {
  create,
  exists,
  getEventApply,
  getPlayerByPersonUidAndEvent,
  setAcceptedApply,
  setDeniedApply
} from "../controllers/eventApply.controller";

const router = Router();

router.route("/getPlayerByPersonUidAndEvent/:userUid/:eventId").get(getPlayerByPersonUidAndEvent);

router.route("/create").post(create)

router.route("/setAcceptedApply").post(setAcceptedApply)

router.route("/setDeniedApply").post(setDeniedApply)

router.route("/getEventApply").post(getEventApply);

router.route("/exists/:playerId/:eventId").get(exists);



export default router;

