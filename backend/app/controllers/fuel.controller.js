import FuelIntake from "../models/fuel.model.js";
import User from "../models/user.model.js";
import Car from "../models/car.model.js";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const fuelIntakeController = {
  getAll: async (req, res) => {
    try {
      const fuelIntakes = await FuelIntake.find().populate(["car_id", "attendant", { path: "car_id", populate: { path: "driver" } }]);
      res.json(fuelIntakes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getAllByCar: async (req, res) => {
    try {
      // const carId = req.params.carId;
      // const fuelIntakes = await FuelIntake.find({ car_id: carId })
      // res.json(fuelIntakes);
      const car = await Car.findById(req.params.carId).populate('driver');

      const car_id = req.params.carId;
      const fuelIntakeDetails = await getFuelIntakeDetails(car_id);
      res.status(200).json({ car, fuelIntakeDetails });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },


  getOne: async (req, res) => {
    try {
      const fuelIntake = await FuelIntake.findById(req.params.id).populate(["car_id", "attendant", { path: "car_id", populate: { path: "driver" } }]);
      res.json(fuelIntake);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  create: async (req, res) => {
    const fuelIntakeLimit = 1000;


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
    console.log(req.body);
    console.log('dang')
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
async function getTotalFuelIntake(car_id) {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  console.log("fuelIntakes");

  const startDate = new Date(currentYear, currentMonth - 1, 1);
  const endDate = new Date(currentYear, currentMonth, 1);

  const fuelIntakes = await FuelIntake.find({
    car_id: car_id,
    fuelDate: { $gte: startDate, $lt: endDate },
  });

  const totalFuelIntake = fuelIntakes.reduce(
    (total, intake) => total + intake.fuelAmount,
    0
  );

  return totalFuelIntake;
}

export async function getFuelIntakeForCurrentMonth(car_id) {
  console.log("fuelIntakes");
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  console.log("fuelIntakes");

  const startDate = new Date(currentYear, currentMonth - 1, 1);
  const endDate = new Date(currentYear, currentMonth, 1);
  const fuelIntakes = await FuelIntake.aggregate([
    {
      $match: {
        car_id: new ObjectId(car_id),
        fuelDate: { $gte: startDate, $lt: endDate },
      },
    },
    {
      $group: {
        _id: {
          month: { $month: "$fuelDate" },
          year: { $year: "$fuelDate" },
        },
        totalFuelAmount: { $sum: "$fuelAmount" },
        fuelIntakes: { $push: "$$ROOT" },
      },
    },
  ]);
  console.log("fuelIntakes");
  console.log(fuelIntakes);

  return fuelIntakes;
}
async function getFuelIntakeDetails(car_id) {
  const currentMonthFuelIntake = await getFuelIntakeForCurrentMonth(car_id);

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  console.log(car_id);
  console.log(currentMonth);
  console.log(currentYear);


  const startDate = new Date(currentYear, currentMonth - 1, 1);
  console.log(startDate);
  const fuelIntakes = await FuelIntake.aggregate([
    {
      $match: {
        car_id: new ObjectId(car_id),
        fuelDate: { $lt: startDate },
      },
    },
    {
      $group: {
        _id: {
          month: { $month: "$fuelDate" },
          year: { $year: "$fuelDate" },
        },
        totalFuelAmount: { $sum: "$fuelAmount" },
        fuelIntakes: { $push: "$$ROOT" },
      },
    },
    {
      $sort: {
        "_id.year": -1,
        "_id.month": -1,
      },
    },
  ]);
  console.log(fuelIntakes);

  return [...currentMonthFuelIntake, ...fuelIntakes];
}