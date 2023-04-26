import express from "express";
import fuelIntakeController from "../controllers/fuel.controller.js";

const router = express.Router();

router.get("/", fuelIntakeController.getAll);
router.get("/:id", fuelIntakeController.getOne);
router.post("/", fuelIntakeController.create);
router.put("/:id", fuelIntakeController.update);
router.delete("/:id", fuelIntakeController.delete);

export default router;
