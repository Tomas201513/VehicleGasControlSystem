import express from 'express';
import auth from '../middleware/auth.middleware.js';
import { admin, attendant, driver, adminAttendant } from "../middleware/roleCheck.middleware.js";
import { getCars, getCarById, createCar, updateCar, deleteCar } from '../controllers/car.controller.js';
const router = express.Router();

// Car routes
router.get('/', getCars);
router.get('/:id', auth, admin,  getCarById);
router.post('/', auth, admin, createCar);
router.put('/:id', auth, admin, updateCar);
router.delete('/:id', auth, admin, deleteCar);

export default router;

// git