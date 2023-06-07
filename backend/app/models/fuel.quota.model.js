import mongoose from "mongoose";
import { ObjectId } from "mongodb";


const Schema = mongoose.Schema;

const fuelQuotaSchema = new Schema({
    quotaName: {
        type: String,
        required: true,
      },
    fuelQuotas: {
        type: Number,
        required: true,
    },
});

const FuelQuota = mongoose.model("FuelQuota", fuelQuotaSchema);

export default FuelQuota;
