import mongoose from "mongoose";

const Schema = mongoose.Schema;

const tankerSchema = new Schema({
    FuelCapacity: {
        type: Number,
        required: true,
    },
    currentFuelAmount: {
        type: Number,
        required: true,
    },
});

const Tanker = mongoose.model("Tanker", tankerSchema);

export default Tanker;
