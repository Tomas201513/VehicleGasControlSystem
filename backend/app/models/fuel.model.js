import mongoose from "mongoose";

const Schema = mongoose.Schema;

const fuelIntakeSchema = new Schema({
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
  fuelAmount: {
    type: Number,
    required: true,
  },
  fuelDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const FuelIntake = mongoose.model("Fuel", fuelIntakeSchema);

export default FuelIntake;

