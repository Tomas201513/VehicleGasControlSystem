import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import Station from "./station.model.js";

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
  station: {
    type: Schema.Types.ObjectId,
    ref: "Station",
    required: true,
  },
});

// fuelIntakeSchema.pre("findOneAndUpdate", async function (next, doc) {
//   console.log({ doc });
//   const oldFuelIntake = await FuelIntake.findById(this._conditions._id);
//   console.log("old", oldFuelIntake);
//   const newFuelIntake = this._update.fuelAmount;
//   console.log('new', newFuelIntake);
//   const station = await Station.findById(this._update.station);

//   if (station) {
//     station.currentFuelAmount -= oldFuelIntake.fuelAmount;
//     station.currentFuelAmount += newFuelIntake;
//     console.log(station.currentFuelAmount);
//     await station.save();
//   }

// next();
// });

fuelIntakeSchema.pre("save", async function (next) {
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

      // For create method
      if (fuelIntake.isNew) {
        // Do your create-specific logic here
      }

      // For update method
      if (fuelIntake.isModified('fuelAmount')) {
        const oldFuelIntake = await FuelIntake.findById(fuelIntake._id);
        console.log("old", oldFuelIntake);

        const zstation = await Station.findById(fuelIntake.station);

        if (zstation) {
          zstation.currentFuelAmount -= oldFuelIntake.fuelAmount;
          zstation.currentFuelAmount += fuelIntake.fuelAmount;
          await zstation.save();
        }
      }

      next();
    } catch (error) {
      next(error);
    }
  });
});


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


const FuelIntake = mongoose.model("Fuel", fuelIntakeSchema);

export default FuelIntake;