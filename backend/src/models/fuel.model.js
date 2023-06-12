import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import Station from "./station.model.js";
import Car from "./car.model.js";
const Schema = mongoose.Schema;

const fuelIntakeSchema = new Schema({
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
  fuelAmount: {
    type: Number,
    required: true,
  },
  station: {
    type: Schema.Types.ObjectId,
    ref: "Station",
    required: true,
  },
  
});

// Add this pre-delete middleware to your fuelIntakeSchema
fuelIntakeSchema.pre("findOneAndDelete", async function (next) {
  const fuelIntake = await FuelIntake.findById(this.getQuery()._id);

  if (fuelIntake) {
    const station = await Station.findById(fuelIntake.station);

    if (station) {
      station.currentFuelAmount += fuelIntake.fuelAmount;
      await station.save();
    }
  }

  next();
});


fuelIntakeSchema.statics.deleteManyWithPreHooks = async function (ids) {
  console.log("delete many with pre hooks");
  // Ids= ids.split(',')
  // console.log(Ids);
  const fuelIntakes = await this.find({ _id: { $in: ids } });

  for (const fuelIntake of fuelIntakes) {
    const station = await Station.findById(fuelIntake.station);

    if (station) {
      station.currentFuelAmount += fuelIntake.fuelAmount;
      await station.save();
    }
  }

  return this.deleteMany({ _id: { $in: ids } });
};

// fuelIntakeSchema.pre("findByIdAndDelete", async function (next) {
//   console.log("pre delete");
//   // Get the old fuel intake values
//   const oldFuelIntake = await FuelIntake.findById(this._conditions._id);
//   const station = await Station.findById(this._update.station);
//   if (station && oldFuelIntake) {
//     station.currentFuelAmount += oldFuelIntake.fuelAmount
//     await station.save();
//   }

//   next();
// });
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

    const car = await Car.findById(fuelIntake.car_id).populate('quota');
    console.log('fffffffffffffff',car);
    if (totalFuelIntake + fuelIntake.fuelAmount > car.quota.fuelQuotas) {
      throw new Error("Monthly fuel intake limit exceeded");
    }

    // Update the station's current fuel amount
    const station = await Station.findById(fuelIntake.station);
    console.log(station);
    if (station) {
      station.currentFuelAmount -= fuelIntake.fuelAmount;
      console.log(station);

      await station.save();
    }

    next();
  } catch (error) {
    next(error);
  }
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