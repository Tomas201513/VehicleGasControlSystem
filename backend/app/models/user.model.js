import mongoose from "mongoose";
import Car from "./car.model.js";
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

  console.log('pre delete', userId);
  try {
    console.log('pre delete');
    deletedCars = await this.model('Car').deleteMany({ driver: userId });
    console.log('Deleted cars:', deletedCars);

    next();
  } catch (error) {
    next(error);
  }
});
const User = mongoose.model("User", userSchema);

export default User;
