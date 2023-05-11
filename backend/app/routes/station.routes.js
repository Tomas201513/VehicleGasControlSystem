import express from 'express';
import auth from "../middleware/auth.middleware.js";
import { getStation, getStationById, createStation, updateStation, deleteStation } from "../controllers/station.controler.js";
const router = express.Router();

router.get("/", getStation);
router.get("/:id", getStationById);
router.post("/", createStation);
router.patch("/:id", updateStation);
router.delete("/:id", deleteStation);

export default router;

