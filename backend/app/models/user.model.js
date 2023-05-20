import mongoose from "mongoose";
import Car from "./car.model.js";
import FuelIntake from "./fuel.model.js";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: [String],
    enum: ["driver", "attendant", "admin", "super_admin"],
    default: ["driver"],
  },
});
userSchema.pre('findOneAndDelete', async function (next) {
  const userId = this.getQuery()["_id"];
  try {
    const cars = await Car.find({ driver: userId });
    const carIds = cars.map(car => car._id);

    const fuelIntakeCount = await FuelIntake.countDocuments({ car_id: { $in: carIds } });

    if (fuelIntakeCount > 0) {
      // The user has cars with associated fuel fill records, do not delete the user
      const error = new Error('Cannot delete user with cars having associated fuel fill records');
      next(error);
    } else {
      await Car.deleteMany({ driver: userId });
      // The user's cars have no associated fuel fill records, proceed with deletion
      next();
    }
  } catch (error) {
    next(error);
  }
});
const User = mongoose.model("User", userSchema);

export default User;


// CASCADE
// userSchema.pre('findOneAndDelete', async function (next) {
//   const userId = this.getQuery()["_id"];
//   try {
//     await Car.deleteMany({ driver: userId });
//     next();
//   } catch (error) {
//     next(error);
//   }
// });


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