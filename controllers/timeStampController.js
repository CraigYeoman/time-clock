import Employee from "../models/employee.js";
import TimeStamp from "../models/timeStamp.js";

const getAllTimeStamps = async (req, res) => {
  const timeStamps = await TimeStamp.find().populate("employee").sort();
  res.status(200).json({ timeStamps });
};

const timeStampDetail = async (req, res, next) => {
  TimeStamp.findById(req.params.id)
    .populate("employee")
    .exec(function (err, results) {
      if (err) {
        return next(err);
      }
      if (results == null) {
        const err = new Error("Time stamp not found");
        err.status = 404;
        return next(err);
      }
      res.status(200).json({
        timeStamp: results,
      });
    });
};

const timeStampCreate = (req, res, next) => {
  const timeStamp = new TimeStamp({
    employee: req.body.employeeId,
  });

  timeStamp.save((err) => {
    if (err) {
      return next(err);
    }
    // Part saved.
    res.status(200).json({
      msg: "Time stamp created",
      timeStamp: timeStamp,
    });
  });
};

const timeStampDelete = (req, res, next) => {
  TimeStamp.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      return next(err);
    }
    // Success
    res.status(200).json({
      msg: "Complete",
    });
  });
};

const timeStampEdit = (req, res, next) => {
  const timeStamp = new TimeStamp({
    employee: req.body.employeeId,
    timeStamp: req.body.timeStamp,
  });

  TimeStamp.findByIdAndUpdate(
    req.params.id,
    timeStamp,
    {},
    (err, updatedTimeStamp) => {
      if (err) {
        return next(err);
      }

      res.status(200).json({
        msg: "TimeStamp edited",
        updatedTimeStamp: updatedTimeStamp,
        timeStamp: timeStamp,
      });
    }
  );
};

export {
  getAllTimeStamps,
  timeStampDetail,
  timeStampCreate,
  timeStampDelete,
  timeStampEdit,
};