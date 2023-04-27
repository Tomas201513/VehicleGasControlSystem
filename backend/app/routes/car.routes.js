import express from 'express';
import auth from "../middleware/auth.middleware.js";
import { getCars, getCarById, createCar, updateCar, deleteCar } from '../controllers/car.controller.js';

const router = express.Router(); 

// Car routes
router.get('/', getCars);
router.get('/:id',auth, getCarById);
router.post('/',auth, createCar);
router.put('/:id',auth, updateCar);
router.delete('/:id',auth, deleteCar);

export default router;
