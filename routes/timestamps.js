import express from "express";
const router = express.Router();

import {
  getAllTimeStamps,
  timeStampDetail,
  timeStampCreate,
  timeStampDelete,
  timeStampEdit,
} from "../controllers/timeStampController";

router.route("/create").post(timeStampCreate);

router.route("/:id/delete").post(timeStampDelete);

router.route("/:id/edit").post(timeStampEdit);

router.route("/:id").get(timeStampDetail);

router.route("/").get(getAllTimeStamps);

export default router;
