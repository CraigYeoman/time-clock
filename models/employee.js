import mongoose from "mongoose";

const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  name: { type: String, required: true, minlength: 3 },
  pin: { type: Number, required: true, minlength: 4, maxlength: 4 },
});

export default mongoose.model("Employee", EmployeeSchema);
