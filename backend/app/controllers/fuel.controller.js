import FuelIntake from "../models/fuel.model.js";
import User from "../models/user.model.js";
import Car from "../models/car.model.js";
const fuelIntakeController = {
  getAll: async (req, res) => {
    try {
      const fuelIntakes = await FuelIntake.find().populate([ "car_id", "attendant",{ path: "car_id", populate: { path: "driver" } }]);
      res.json(fuelIntakes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getOne: async (req, res) => {
    try {
      const fuelIntake = await FuelIntake.findById(req.params.id).populate( ["car_id", "attendant",{ path: "car_id", populate: { path: "driver" } }]);
      res.json(fuelIntake);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  create: async (req, res) => {
      try {
    // Find the user by ID
    const attendant = await User.findById(req.body.attendant);
        const car = await Car.findById(req.body.car_id).populate("driver");


    // Check if the user exists
    if (!(attendant && car)) {
      return res.status(404).json({ message: "User not found" });
    }

    const fuelIntake = new FuelIntake(req.body);
   await fuelIntake.save();

    // Send the created car as a response
    res.status(201).json(fuelIntake);
  } catch (error) {
    // Determine the appropriate status code based on the error type
    const statusCode = error.name === 'ValidationError' ? 400 : 500;
    res.status(statusCode).json({ message: error.message });
  }
},

  update: async (req, res) => {
    try {
    // Find the user by ID
    const user = await User.findById(req.body.attendant);
    const car = await Car.findById(req.body.car_id);

    // Check if the user exists
    if (!(user && car)) {
      return res.status(404).json({ message: "User not found" });
    }
        // Find the fuel intake by ID
    const fuelIntake = await FuelIntake.findById(req.params.id);

    // Check if the fuel intake exists
    if (!fuelIntake) {
      return res.status(404).json({ message: "Fuel intake not found" });
    }

    // Update the fuel intake with the request body
    Object.assign(fuelIntake, req.body);
    await fuelIntake.save();

    // Send the updated fuel intake as a response
    res.status(200).json(fuelIntake);
  } catch (error) {
    // Determine the appropriate status code based on the error type
    const statusCode = error.name === 'ValidationError' ? 400 : 500;
    res.status(statusCode).json({ message: error.message });
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
