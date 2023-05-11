import Station from "../models/station.model.js";

// Get all station
export const getStation = async (req, res) => {
    try {
        const station = await Station.find();
        res.status(200).json(station);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get a station by ID
export const getStationById = async (req, res) => {
    try {
        const station = await Station.findById(req.params.id);
        res.status(200).json([station]);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Create a new station
export const createStation = async (req, res) => {
    try {
        const station = await Station.create(req.body);
        res.status(201).json(station);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update a station
export const updateStation = async (req, res) => {
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
}

// Delete a station
export const deleteStation = async (req, res) => {
    try {
        const station = await Station.findById(req.params.id);
        if (!station) {
            return res.status(404).json({ message: "Station not found" });
        }
        await station.remove();
        res.status(200).json({ message: "Station deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}




