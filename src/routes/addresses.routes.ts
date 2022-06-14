import { Router } from "express";
import {
  create, findAllByUser,
} from "../controllers/address.controller";

const router = Router();

router.route("/:uid").get(findAllByUser);

router.route("/create").post(create);

export default router;