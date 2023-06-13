import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TimeStampSchema = new Schema({
  employee: {
    type: Schema.Types.ObjectId,
    ref: "employee",
    required: [true, "Employee must be provided"],
  },
  timeStamp: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("TimeStamp", TimeStampSchema);
