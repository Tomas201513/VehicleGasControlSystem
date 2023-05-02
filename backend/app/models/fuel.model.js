import mongoose from "mongoose";

const Schema = mongoose.Schema;

const fuelIntakeSchema = new Schema({
  fuelAmount: {
    type: Number,
    required: true,
  },
  fuelDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  car_id: {
    type: Schema.Types.ObjectId,
    ref: "Car",
    required: true,
  },
  attendant: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const FuelIntake = mongoose.model("Fuel", fuelIntakeSchema);

export default FuelIntake;

