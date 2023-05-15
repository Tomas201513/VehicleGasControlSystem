import express from 'express';
import auth from '../middleware/auth.middleware.js';
import { admin, attendant, driver } from "../middleware/roleCheck.middleware.js";
import { getCars, getCarById, createCar, updateCar, deleteCar } from '../controllers/car.controller.js';
const router = express.Router();

// Car routes
router.get('/', auth, admin, attendant, getCars);
router.get('/:id', auth, admin, attendant, getCarById);
router.post('/', auth, admin, attendant, createCar);
router.put('/:id', auth, admin, attendant, updateCar);
router.delete('/:id', auth, admin, attendant, deleteCar);

export default router;

// git