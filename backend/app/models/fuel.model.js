import mongoose from "mongoose";
import { ObjectId } from "mongodb";

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
fuelIntakeSchema.pre("save", async function (next) {
  try {
    const fuelIntake = this;
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const totalFuelIntake = await getTotalFuelIntake(
      fuelIntake.car_id,
      currentMonth,
      currentYear
    );

    if (totalFuelIntake + fuelIntake.fuelAmount > 1000) {
      throw new Error("Monthly fuel intake limit exceeded");
    }

    next();
  } catch (error) {
    next(error);
  }
});

const FuelIntake = mongoose.model("Fuel", fuelIntakeSchema);

export default FuelIntake;

async function getTotalFuelIntake(car_id) {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  console.log("fuelIntakes");

  const startDate = new Date(currentYear, currentMonth - 1, 1);
  const endDate = new Date(currentYear, currentMonth, 1);

  const fuelIntakes = await FuelIntake.aggregate([
    {
      $match: {
        car_id: new ObjectId(car_id),
        fuelDate: { $gte: startDate, $lt: endDate },
      },
    },
    {
      $group: {
        _id: "$car_id",
        totalFuelAmount: { $sum: "$fuelAmount" },
      },
    },
  ]);

  return fuelIntakes.length > 0 ? fuelIntakes[0].totalFuelAmount : 0;
}