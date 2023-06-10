import express from 'express';
import stationController from '../controllers/station.controler.js';
import auth from '../middleware/auth.middleware.js';
import { admin, attendant, driver, adminAttendant } from "../middleware/roleCheck.middleware.js";

const router = express.Router();

router.get("/", auth, adminAttendant, stationController.getStation);
router.get("/:id", auth, admin, stationController.getStationById);
router.post("/", auth, admin, stationController.create);
router.post("/fill/:id", auth, attendant, stationController.fill);
router.put("/:id", auth, admin, stationController.update);
router.delete("/:id", auth, admin, stationController.delete);

export default router;
