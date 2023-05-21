import mongoose from "mongoose";
import FuelIntake from "./fuel.model.js";

const Schema = mongoose.Schema;

const stationSchema = new Schema({
    stationName: {
        type: String,
        required: true,
    },
    stationLocation: {
        type: String,
        required: true,
    },
    stationOwner: {
        type: String,
        required: true,
    },
    FuelCapacity: {
        type: Number,
        required: true,
    },
    currentFuelAmount: {
        type: Number,
        required: true,
    },
});
stationSchema.pre('save', function (next) {
    console.log('pre save', this.FuelCapacity, this.currentFuelAmount);
    if (this.FuelCapacity < this.currentFuelAmount) {
        const error = new Error('FuelCapacity exceeded');
        next(error);
    } else {
        next();
    }
});
stationSchema.pre('findOneAndDelete', async function (next) {
    console.log('xxxxx', this.getQuery()["_id"])
    try {
        const fuelIntakeCount = await FuelIntake.countDocuments({ station: { $in: this.getQuery()["_id"] } });

        if (fuelIntakeCount > 0) {
            // The user has cars with associated fuel fill records, do not delete the user
            const error = new Error('Cannot delete station with associated fuel records');
            next(error);
        } else {
            // The user's cars have no associated fuel fill records, proceed with deletion
            next();
        }
    } catch (error) {
        next(error);
    }
});
const Station = mongoose.model("Station", stationSchema);

export default Station;

//PROTECT 
// userSchema.pre('findOneAndDelete', async function (next) {
//   const userId = this.getQuery()["_id"];
//   try {
//     const carCount = await Car.countDocuments({ driver: userId });
//     if (carCount > 0) {
//       const error = new Error("Cannot delete user it's associated with car");
//       next(error);
//     } else {
//       next();
//     }
//   } catch (error) {
//     next(error);
//   }
// });