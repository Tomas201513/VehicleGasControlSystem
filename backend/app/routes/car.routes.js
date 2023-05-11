import express from 'express';
import auth from "../middleware/auth.middleware.js";
import { getCars, getCarById, createCar, updateCar, deleteCar } from '../controllers/car.controller.js';
const router = express.Router();

// Car routes
router.get('/', getCars);
router.get('/:id', getCarById);
router.post('/', createCar);
router.put('/:id', updateCar);
router.delete('/:id', deleteCar);

export default router;

// git