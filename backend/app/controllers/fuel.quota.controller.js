import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import FuelQuota from "../models/fuel.quota.model.js ";

const fuelQuotaController = {
    getAll: async (req, res) => {
        try {
            const fuelQuotas = await FuelQuota.find();
            res.json(fuelQuotas );
        } catch (error) {
            console.error(error);
        }
    },

    getOne: async (req, res) => {
       try {
           const fuelQuotas = await FuelQuota.findById(req.params.id);
           res.json(fuelQuotas );
       } catch (error) {
           console.error(error);
       }
    },

    create: async (req, res) => {
        try {
            const fuelQuotas = new FuelQuota(req.body);
            await fuelQuotas.save();
            res.json( fuelQuotas );
        } catch (error) {
            console.error(error);
        }
    },

    update: async (req, res) => {
       try {
        const quota = await FuelQuota.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        res.json( quota );
         } catch (error) {
                console.error(error);
            }
    },
    

    delete: async (req, res) => {
        try {
            const fuelQuotas = await FuelQuota.findByIdAndDelete(req.params.id);
            res.json( fuelQuotas );
        } catch (error) {
            console.error(error);
        }
    }
};

export default fuelQuotaController;



