import Car from '../models/car.model.js';

// Get all cars
export const getCars = async (req, res) => {
  try {
    const cars = await Car.find().populate('driver');
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a car by ID
export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id).populate('driver');
    res.status(200).json(car);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Create a new car
export const createCar = async (req, res) => {
  const newCar = new Car(req.body);
  try {
    await newCar.save();
    res.status(201).json(newCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a car
export const updateCar = async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a car
export const deleteCar = async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
