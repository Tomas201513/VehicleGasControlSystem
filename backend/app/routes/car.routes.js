import { Router } from "express";
import Car from "../models/Car.models.js"
const router = Router();


router.get("/details", auth, (req, res) => {
	res.status(200).json({ message: "user authenticated." });
});

export default router;