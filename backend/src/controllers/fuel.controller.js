import FuelIntake from "../models/fuel.model.js";
import User from "../models/user.model.js";
import Car from "../models/car.model.js";
import Station from "../models/station.model.js";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const fuelIntakeController = {
  getMonthly: async (req, res) => {
    try {
      const anualIntakes = await FuelIntake.aggregate([
        {
          $sort: {
            fuelDate: 1
          }
        },
        {
          $group: {
            _id: {
              year: { $year: "$fuelDate" },
              month: { $month: "$fuelDate" }
            },
            totalFuelAmountMonth: { $sum: "$fuelAmount" }
          }
        },
        {
          $group: {
            _id: "$_id.year",
            monthlyIntakes: {
              $push: {
                month: "$_id.month",
                totalFuelAmountMonth: "$totalFuelAmountMonth"
              }
            }
          }
        },
        { $unwind: "$monthlyIntakes" },
        { $sort: { "_id": -1, "monthlyIntakes.month": -1 } },
        {
          $group: {
            _id: "$_id",
            monthlyIntakes: {
              $push: {
                month: "$monthlyIntakes.month",
                totalFuelAmountMonth: "$monthlyIntakes.totalFuelAmountMonth"
              }
            }
          }
        }
      ]);


      res.json({ anualIntakes });
    } catch (error) {
      console.error(error);
    }
  },
  
  getPaginated: async (req, res) => {
    console.log("getPaginateeeeeeeeed");
    try {
      const { page = 0, limit = 10 } = req.params;
      const { s:search } = req.query;
      console.log("key", page, limit, search);
      console.log("key",req.query);

        if(search !== undefined && search !== null && search !== ""){
          console.log("Search")
          
        //  if (page < 1) {
        //   console.log("Invalid page number")
        //     return res.status(400).json({ message: "Invalid page number" });
        //   }
            const startIndex = (page) * limit;
            const endIndex = (page+1) * limit;
            console.log(startIndex, endIndex);
            
            const name= search.toLowerCase();
          const allFuelIntake = await FuelIntake.find().populate(["car_id", "station", "attendant",
          { path: "car_id", populate: { path: "driver" } }]).sort({ fuelDate: -1 });
          const fuelIntake = allFuelIntake.filter(fuelIntake => {
            return fuelIntake.car_id.plateNumber.toLowerCase().includes(search)
            || fuelIntake.car_id.driver.userName.toLowerCase().includes(name)
            || fuelIntake.station.stationName.toLowerCase().includes(name)
            || fuelIntake.attendant.userName.toLowerCase().includes(name)
            || fuelIntake.fuelAmount.toString().toLowerCase().includes(search)
            // || fuelIntake.fuelDate.toString().toLowerCase().includes(search)
        }
        )
        const count = fuelIntake.length;
        const fuelIntakes = fuelIntake.slice(startIndex, endIndex);

        res.json({
          fuelIntakes,
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          totalIems: count
        });        
        }
      else{
        console.log("No Search")

        const fuelIntakes = await FuelIntake.find()
        .populate(["car_id", "station", "attendant", { path: "car_id", populate: { path: "driver" } }])
        .skip((page ) * limit)
        .limit(limit * 1)
        .sort({ fuelDate: -1 });
        
        const count = await FuelIntake.countDocuments();
        res.json({
          fuelIntakes,
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          totalIems: count
        });
      }

    } catch (error) {
      console.error(error);
    }
  },
  


  getAll: async (req, res) => {

    try {
      const currentDate = new Date();
      const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      const currentMnthfuelIntakes = await FuelIntake.find({
        fuelDate: {
          $gte: firstDayOfMonth,
          $lte: lastDayOfMonth
        }
      }).populate(["car_id", "station", "attendant", { path: "car_id", populate: { path: "driver" } }]);
      const currentMonthIntake = currentMnthfuelIntakes.reduce((acc, fuelIntake) => {
        return acc + fuelIntake.fuelAmount;
      }, 0);

      const fuelIntakes = await FuelIntake.find().populate(["car_id", "station", "attendant",
        { path: "car_id", populate: { path: "driver" } }]).sort({ fuelDate: -1 });
      // Calculate the total fuel consumed by all cars
      const totalFuelConsumed = fuelIntakes.reduce((acc, fuelIntake) => {
        return acc + fuelIntake.fuelAmount;
      }, 0);

      res.json({ fuelIntakes, totalFuelConsumed, currentMonthIntake });
      // res.json(fuelIntakes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAllByCar: async (req, res) => {
    const { page = 0 } = req.params;

    console.log('carId', req.params.carId,'page',page);
    try {
      // const car_id = req.params.carId;
      if (req.params.carId.length <= 10) {
        const car = await Car.findOne({ plateNumber: req.params.carId }).populate('driver');
        const fuelIntakeDetails = await getFuelIntakeDetails(car._id)
        const fuelIntakeDetail= fuelIntakeDetails.slice(page, page+1)
        res.status(200).json({  car, 
          fuelIntakeDetail,
          totalPages: Math.ceil(fuelIntakeDetails.length),
          currentPage: page, });

      } else {
        const car = await Car.findById(req.params.carId).populate('driver');
        const fuelIntakeDetails = await getFuelIntakeDetails(car._id)
        const fuelIntakeDetail= fuelIntakeDetails.slice(page, page+1)

      res.status(200).json({ 
        car, 
        fuelIntakeDetail,
        totalPages: Math.ceil(fuelIntakeDetails.length),
        currentPage: page,
      });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },


  getOne: async (req, res) => {
    try {
      const fuelIntake = await FuelIntake.findById(req.params.id).populate(["car_id", "attendant", {
        path: "car_id", populate: { path: "driver" }
      }, "station"]); 
      res.json(fuelIntake);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  create: async (req, res) => {
    console.log('olaaaa');
    console.log(req.body);

    try {
      // Find the user by ID
      const attendant = await User.findById(req.body.attendant);
      const car = await Car.findById(req.body.car_id).populate("driver");
      const station = await Station.findById(req.body.station)
      console.log('attendanttttttttttt', attendant);
      console.log('car', car);
      console.log('station', station);
      // Check if the user exists
      if (!(attendant)) {
        return res.status(404).json({ message: "User not found" });
      }
      if (!(car)) {
        return res.status(404).json({ message: "Car not found" });
      }
      if (!(station)) { // Add this block to check if the station exists
        return res.status(404).json({ message: "Station not found" });
      }
      const fuelIntake = new FuelIntake(req.body);
      await fuelIntake.save();
      console.log('s', fuelIntake);

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
      const attendant = await User.findById(req.body.attendant);
      const car = await Car.findById(req.body.car_id);

      // Check if the user exists
      if (!(attendant)) {
        return res.status(404).json({ message: "User not found" });
      }
      if (!(car)) {
        return res.status(404).json({ message: "Car not found" });
      }
      // Find and update the fuel intake by ID
      const updatedFuelIntake = await FuelIntake.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );

      // Check if the fuel intake exists
      if (!updatedFuelIntake) {
        return res.status(404).json({ message: "Fuel intake not found" });
      }

      // Send the updated fuel intake as a response
      res.status(200).json(updatedFuelIntake);
    } catch (error) {
      // Determine the appropriate status code based on the error type
      const statusCode = error.name === 'ValidationError' ? 400 : 500;
      res.status(statusCode).json({ message: error.message });
    }
  },

  // Delete function
  delete: async (req, res) => {
    console.log('abc', req.params.id);
    try {
      await FuelIntake.findOneAndDelete({ _id: req.params.id });
      res.json({ message: "FuelIntake deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // Delete Many function
  deleteMany: async (req, res) => {
    const  ids  = req.params.ids.split(',');
    // console.log('ids', req.params.ids.split(','));
    try {
      await FuelIntake.deleteManyWithPreHooks(ids);
      res.status(200).json({ message: 'Successfully deleted selected fuel intakes' });
     } catch (error) {
       res.status(500).json({ error: 'Error deleting selected fuel intakes' });
     }
   },


  search: async (req, res) => {
    console.log('search', req.params.key);
    try {
      const fuelIntakes = await FuelIntake.find().populate(["car_id", "station", "attendant",
        { path: "car_id", populate: { path: "driver" } }]).sort({ fuelDate: -1 });
      const filteredFuelIntakes = fuelIntakes.filter(fuelIntake => {
        return fuelIntake.car_id.plateNumber.toLowerCase().includes(req.params.key)
          || fuelIntake.car_id.driver.userName.toLowerCase().includes(req.params.key)
          || fuelIntake.station.stationName.toLowerCase().includes(req.params.key)
          || fuelIntake.attendant.userName.toLowerCase().includes(req.params.key)
          || fuelIntake.fuelAmount.toString().toLowerCase().includes(req.params.key)
          || fuelIntake.fuelDate.toString().toLowerCase().includes(req.params.key)
      }
      );
      res.json(filteredFuelIntakes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
}
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
