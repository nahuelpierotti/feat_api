import { Router } from "express";
import {
  create, findAllByUser,update
} from "../controllers/address.controller";

const router = Router();

router.route("/:userUid").get(findAllByUser);

router.route("/create").post(create);

router.route("/update").put(update);

export default router;