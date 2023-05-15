import express from "express";
import fuelIntakeController from "../controllers/fuel.controller.js";
import auth from '../middleware/auth.middleware.js';
import { admin, attendant, driver } from "../middleware/roleCheck.middleware.js";

const router = express.Router();

router.get("/", auth, admin, fuelIntakeController.getAll);
router.get("/:id", auth, admin,  fuelIntakeController.getOne);
router.post("/", auth, admin, fuelIntakeController.create);
router.put("/:id", auth, auth, admin, fuelIntakeController.update);
router.delete("/:id", auth, admin, fuelIntakeController.delete);
router.get("/car/:carId", auth, admin, fuelIntakeController.getAllByCar);
router.get("/monthly/:month", auth, admin,fuelIntakeController.getMonthly);

export default router;
