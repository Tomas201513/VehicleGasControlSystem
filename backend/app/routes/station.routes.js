import express from 'express';
import stationController from '../controllers/station.controler.js';

const router = express.Router();

router.get("/", stationController.getStation);
router.get("/:id", stationController.getStationById);
router.post("/", stationController.create);
router.put("/:id", stationController.update);
router.delete("/:id", stationController.delete);

export default router;
