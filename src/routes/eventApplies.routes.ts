import { Router } from "express";
import {
  create,
  getPlayerByPersonUidAndEvent
} from "../controllers/eventApply.controller";

const router = Router();

router.route("/getPlayerByPersonUidAndEvent/:userUid/:eventId").get(getPlayerByPersonUidAndEvent);

router.route("/create").post(create)

export default router;

