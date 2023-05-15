import express from "express";
import fuelIntakeController from "../controllers/fuel.controller.js";
import auth from '../middleware/auth.middleware.js';
import { admin, attendant, driver } from "../middleware/roleCheck.middleware.js";

const router = express.Router();

router.get("/", auth, admin, attendant, fuelIntakeController.getAll);
router.get("/:id", auth, admin, attendant, fuelIntakeController.getOne);
router.post("/", auth, admin, attendant, fuelIntakeController.create);
router.put("/:id", auth, auth, admin, attendant, fuelIntakeController.update);
router.delete("/:id", auth, admin, attendant, fuelIntakeController.delete);
router.get("/car/:carId", auth, admin, attendant, fuelIntakeController.getAllByCar);
router.get("/monthly/:month", auth, admin, attendant, fuelIntakeController.getMonthly);

export default router;
