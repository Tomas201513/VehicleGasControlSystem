import mongoose from "mongoose";

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
const Station = mongoose.model("Station", stationSchema);

export default Station;
