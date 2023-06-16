import Employee from "../models/employee.js";
import TimeStamp from "../models/timeStamp.js";
import { body, validationResult } from "express-validator";
import async from "async";

const getAllEmployees = async (req, res) => {
  const employees = await Employee.find();
  const timeStamps = await TimeStamp.find();
  res.status(200).json({ employees, timeStamps });
};

const index = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({ employees });
  } catch (error) {
    console.log(error);
  }
};

const employeeDetail = async (req, res, next) => {
  async.parallel(
    {
      employee(callback) {
        Employee.findById(req.params.id).exec(callback);
      },
      timeStamps(callback) {
        TimeStamp.findById({ employeeId: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.employee == null) {
        const err = new Error("Employee not found");
        err.status = 404;
        return next(err);
      }
      res.status(200).json({
        employee: results.employee,
        timeStamps: results.timeStamps,
      });
    }
  );
};

const employeeCreate = [
  body("name", "Name required").trim().isLength({ min: 1 }).escape(),
  body("pin", "Pin required").trim().isLength({ min: 4 }).escape(),

  async (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);
      res.status(errors).json({
        employee: req.body,
        errors: errors.array(),
      });

      return;
    }

    const employee = new Employee({
      name: req.body.name,
      pin: req.body.pin,
    });

    try {
      employee.save();
      res.status(200).json({
        msg: "Employee created",
        employee: employee,
      });
    } catch (error) {
      console.log(error);
      res.status(errors).json({
        employee: req.body,
        errors: errors.array(),
      });
    }
  },
];

const employeeDelete = (req, res, next) => {
  Employee.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      return next(err);
    }
    // Success
    res.status(200).json({
      msg: "Complete",
    });
  });
};

const employeeEdit = (req, res, next) => {
  const employee = new Employee({
    name: req.body.name,
    pin: req.body.pin,
  });

  Employee.findByIdAndUpdate(
    req.params.id,
    employee,
    {},
    (err, updatedEmployee) => {
      if (err) {
        return next(err);
      }

      res.status(200).json({
        msg: "Employee edited",
        updatedEmployee: updatedEmployee,
        employee: employee,
      });
    }
  );
};

export {
  getAllEmployees,
  employeeDetail,
  employeeCreate,
  employeeDelete,
  employeeEdit,
  index,
};
