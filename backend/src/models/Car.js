import mongoose from "mongoose";

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
    qrCode: {
        type: String,
});

const Car = mongoose.model("Car", carSchema);

export default Car;
