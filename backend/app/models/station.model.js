import mongoose from "mongoose";

const Schema = mongoose.Schema;

const stationSchema = new Schema({
    FuelCapacity: {
        type: Number,
        required: true,
    },
    currentFuelAmount: {
        type: Number,
        required: true,
    },
});

const Station = mongoose.model("Station", stationSchema);

export default Station;
