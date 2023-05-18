import mongoose from "mongoose";

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
UserSchema.pre('findByIdAndDelete', async function (next) {
  try {
    await this.model('Car').deleteMany({ user: this._id });
    next();
  } catch (error) {
    next(error);
  }
});
const User = mongoose.model("User", userSchema);

export default User;
