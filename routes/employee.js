import express from "express";
const router = express.Router();

import {
  getAllEmployees,
  employeeDetail,
  employeeCreate,
  employeeDelete,
  employeeEdit,
  index,
} from "../controllers/employeeController.js";

router.route("/create").post(employeeCreate);

router.route("/:id/delete").post(employeeDelete);

router.route("/:id/edit").post(employeeEdit);

router.route("/:id").get(employeeDetail);

router.route("/index").get(index);

router.route("/").get(getAllEmployees);

export default router;
