import express from "express";
const router = express.Router();

import {
  getAllEmployees,
  employeeDetail,
  employeeCreate,
  employeeDelete,
  employeeEdit,
} from "../controllers/employeeController";

router.route("/create").post(employeeCreate);

router.route("/:id/delete").post(employeeDelete);

router.route("/:id/edit").post(employeeEdit);

router.route("/:id").get(employeeDetail);

router.route("/").get(getAllEmployees);

export default router;
