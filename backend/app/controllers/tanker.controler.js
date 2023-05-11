import Tanker from "../models/tanker.model.js";

// Get all tankers
export const getTankers = async (req, res) => {
    try {
        const tankers = await Tanker.find();
        res.status(200).json(tankers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get a tanker by ID
export const getTankerById = async (req, res) => {
    try {
        const tanker = await Tanker.findById(req.params.id);
        res.status(200).json([tanker]);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Create a new tanker
export const createTanker = async (req, res) => {
    try {
        const tanker = await Tanker.create(req.body);
        res.status(201).json(tanker);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update a tanker
export const updateTanker = async (req, res) => {
    try {
        const tanker = await Tanker.findById(req.params.id);
        if (!tanker) {
            return res.status(404).json({ message: "Tanker not found" });
        }
        Object.assign(tanker, req.body);
        await tanker.save();
        res.status(200).json(tanker);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Delete a tanker
export const deleteTanker = async (req, res) => {
    try {
        const tanker = await Tanker.findById(req.params.id);
        if (!tanker) {
            return res.status(404).json({ message: "Tanker not found" });
        }
        await tanker.remove();
        res.status(200).json({ message: "Tanker deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}




