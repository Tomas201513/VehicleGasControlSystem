import mongoose from "mongoose";
import FuelIntake from "./fuel.model.js";

const Schema = mongoose.Schema;

const carSchema = new Schema({
  plateNumber: {
    type: String,
    required: true,
    unique: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  engine: {
    type: String,
    enum: ["gasoline", "diesel", "electric"],
    default: "gasoline",
  },
  transmission: {
    type: String,
    enum: ["manual", "automatic"],
    default: "manual",
  },
  driver: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});
carSchema.pre('findOneAndDelete', async function (next) {
  console.log('xxxxx', this.getQuery()["_id"])
  try {
    const fuelIntakeCount = await FuelIntake.countDocuments({ car_id: { $in: this.getQuery()["_id"] } });

    if (fuelIntakeCount > 0) {
      // The user has cars with associated fuel fill records, do not delete the user
      const error = new Error('Cannot delete car associated with fuel records');
      next(error);
    } else {
      // The user's cars have no associated fuel fill records, proceed with deletion
      next();
    }
  } catch (error) {
    next(error);
  }
});


const Car = mongoose.model("Car", carSchema);

export default Car;
