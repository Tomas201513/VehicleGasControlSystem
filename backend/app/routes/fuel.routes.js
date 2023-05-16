import express from "express";
import fuelIntakeController from "../controllers/fuel.controller.js";
import auth from '../middleware/auth.middleware.js';
import { admin, attendant, driver, adminAttendant } from "../middleware/roleCheck.middleware.js";

const router = express.Router();

router.get("/", auth, admin, fuelIntakeController.getAll);
router.get("/:id", auth, admin,  fuelIntakeController.getOne);
router.post("/", auth, adminAttendant, fuelIntakeController.create);
router.put("/:id", auth, auth, adminAttendant, fuelIntakeController.update);
router.delete("/:id", auth, adminAttendant, fuelIntakeController.delete);
router.get("/car/:carId", auth, adminAttendant, fuelIntakeController.getAllByCar);
router.get("/monthly/:month", auth, adminAttendant, fuelIntakeController.getMonthly);

export default router;
