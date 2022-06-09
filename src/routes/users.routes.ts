import { Router } from "express";
import {
  findAll,
  findOne,
  update,
  deleteUser,
  create,
} from "../controllers/user.controller";

const router = Router();

router.route("/create").post(create);

router.route("/:id").get(findOne).put(update).delete(deleteUser);

export default router;
