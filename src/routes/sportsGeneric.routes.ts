import { Router } from "express";
import {
  findAll
} from "../controllers/sportGeneric.controller";

const router = Router();

router.route("/").get(findAll);

export default router;