import { Router } from "express";
import bcrypt from "bcrypt";
import User from "../models/User.models"
import generateTokens from "../utils/generateTokens.util"
import {
	signUpBodyValidation,
	logInBodyValidation,
} from "../utils/validationSchema.util"
import signUp from "../controlers/auth.controler";
const router = Router();

// signup
router.post("/signUp", signUp(req,res))

// login
router.post("/logIn", async (req, res) => {
	try {
		const { error } = logInBodyValidation(req.body);
		if (error)
			return res
				.status(400)
				.json({ error: true, message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res
				.status(401)
				.json({ error: true, message: "Invalid email or password" });

		const verifiedPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!verifiedPassword)
			return res
				.status(401)
				.json({ error: true, message: "Invalid email or password" });

		const { accessToken, refreshToken } = await generateTokens(user);

		res.status(200).json({
			error: false,
			accessToken,
			refreshToken,
			message: "Logged in sucessfully",
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: true, message: "Internal Server Error" });
	}
});

export default router;
