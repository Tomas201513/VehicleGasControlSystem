import FuelIntake from "../models/fuel.model.js";
const fuelIntakeController = {
  getAll: async (req, res) => {
    try {
      const fuelIntakes = await FuelIntake.find().populate([ "car_id", "attendant"]);
      res.json(fuelIntakes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getOne: async (req, res) => {
    try {
      const fuelIntake = await FuelIntake.findById(req.params.id).populate( ["car_id", "attendant"]);
      res.json(fuelIntake);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  create: async (req, res) => {
    const fuelIntake = new FuelIntake(req.body);
    try {
      const savedFuelIntake = await fuelIntake.save();
      res.status(201).json(savedFuelIntake);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const updatedFuelIntake = await FuelIntake.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(updatedFuelIntake);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      await FuelIntake.findByIdAndDelete(req.params.id);
      res.json({ message: "FuelIntake deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default fuelIntakeController;
