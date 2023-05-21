import Car from '../models/car.model.js';
import User from '../models/user.model.js';
// Get all cars
export const getCars = async (req, res) => {
  try {
    const cars = await Car.find().populate('driver');
    //groupCarsByYear
    const groupedCars = await Car.aggregate([
      {
        $group: {
          _id: {
            $cond: [
              { $lt: ["$year", 1980] },
              "< 1980",
              {
                $cond: [
                  { $lt: ["$year", 1990] },
                  "1980-1990",
                  {
                    $cond: [
                      { $lt: ["$year", 2000] },
                      "1990-2000",
                      {
                        $cond: [
                          { $lt: ["$year", 2010] },
                          "2000-2010",
                          "> 2010",
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({ cars, groupedCars });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a car by ID
export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id).populate('driver');
    res.status(200).json([car]);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Create a new car
export const createCar = async (req, res) => {
  try {
    const user = await User.findById(req.body.driver);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingCar = await Car.findOne({ driver: req.body.driver });

    if (existingCar) {
      return res.status(400).json({ message: "User already has an associated car" });
    }
    const newCar = new Car(req.body);
    await newCar.save();
    res.status(201).json(newCar);
  } catch (error) {
    const statusCode = error.name === 'ValidationError' ? 400 : 500;
    res.status(statusCode).json({ message: error.message });
  }
};

// Update a car
export const updateCar = async (req, res) => {
  try {
    const user = await User.findById(req.body.driver);
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    const existingCar = await Car.findOne({ driver: req.body.driver });
    if (!(existingCar._id == req.params.id)) {
      return res.status(400).json({ message: "User already has an associated car" });
    }
    Object.assign(car, req.body);
    await car.save();
    res.status(200).json(car);
  } catch (error) {
    const statusCode = error.name === 'ValidationError' ? 400 : 500;
    res.status(statusCode).json({ message: error.message });
  }
};

// Delete a car
export const deleteCar = async (req, res) => {
  console.log('deleteUser controller', req.params.id);
  try {

    await Car.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




