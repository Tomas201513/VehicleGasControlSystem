import Station from "../models/station.model.js";
import { ObjectId } from "mongodb";

const stationController = {
// Get all station
    getStation: async (req, res) => {
    try {
        const station = await Station.find();
        res.status(200).json(station);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    },

// Get a station by ID
    getStationById: async (req, res) => {
    try {
        const station = await Station.findById(req.params.id);
        res.status(200).json([station]);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    },

// Create a new station
    create: async (req, res) => {
    try {
        const station = new Station(req.body);
        await station.save();
        res.status(201).json(station);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    },


// Update a station
    update: async (req, res) => {
    try {
        const station = await Station.findById(req.params.id);
        if (!station) {
            return res.status(404).json({ message: "Station not found" });
        }
        Object.assign(station, req.body);
        await station.save();
        res.status(200).json(station);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    },

// Delete a station
    delete: async (req, res) => {
    try {
        await Station.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Station deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
};

export default stationController;


