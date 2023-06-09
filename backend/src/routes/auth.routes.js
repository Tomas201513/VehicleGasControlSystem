import {signUp,logIn ,logOut,refresh} from "../controllers/auth.controller.js";

import { Router } from "express";

const router = Router();

// signup
router.post("/register", signUp);

// login
router.post("/logIn", logIn)

// logout
router.delete("/logOut", logOut)

// refresh
router.post("/refresh", refresh)

export default router;