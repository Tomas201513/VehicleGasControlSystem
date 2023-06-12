import { Router } from "express";
import { getUsers, getUserById, createUser, updateUser, deleteUser,getMe } from "../controllers/user.controller.js";
import auth from '../middleware/auth.middleware.js';
import { admin, attendant, driver, adminAttendant } from "../middleware/roleCheck.middleware.js";

const router = Router();

router.get('/', getUsers);
router.get('/:id', auth, adminAttendant, getUserById);
router.get("/details", auth, admin, getMe)
router.post('/', auth, admin, createUser);
router.put('/:id', auth, adminAttendant, updateUser);
router.delete('/:id', auth, admin, deleteUser);

export default router;
