import express from "express";
import quotaController from "../controllers/fuel.quota.controller.js";
import auth from '../middleware/auth.middleware.js';
import { admin, attendant, driver, adminAttendant } from "../middleware/roleCheck.middleware.js";

const router = express.Router();

router.get("/",auth, admin, quotaController.getAll);
router.get("/:id",auth,  admin, quotaController.getOne);
router.post("/",auth,  admin, quotaController.create);
router.put("/:id",auth,  admin, quotaController.update);
router.delete("/:id", auth, admin, quotaController.delete);

export default router;
