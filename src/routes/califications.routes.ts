import { Router } from "express";
import {
    qualifyPlayers,findAllByPlayer,findAllByUser
} from "../controllers/calification.controller";

const router = Router();

router.route("/qualifyPlayers").post(qualifyPlayers);

router.route("/findAllByPlayer/:playerId").get(findAllByPlayer);

router.route("/findAllByUser/:userUid").get(findAllByUser);

export default router;