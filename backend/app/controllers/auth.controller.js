import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import {
	logInBodyValidation,
	signUpBodyValidation,
	refreshTokenBodyValidation
} from "../utils/validationSchema.util.js"
import User from "../models/user.model.js";
import UserToken from "../models/userToken.model.js"
import generateTokens from "../utils/generateTokens.util.js"
import verifyRefreshToken from "../utils/verifyRefreshToken.util.js"


export const signUp = async (req, res) => {
	try {
		const { error } = signUpBodyValidation(req.body);
		if (error)
			return res
				.status(400)
				.json({ error: true, message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		console.log(user);
		if (user)
			return res
				.status(400)
				.json({ error: true, message: "User with given email already exist" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();

		res
			.status(201)
			.json({ error: false, message: "Account created sucessfully" });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: true, message: "Internal Server Error" });
	}
}

export const logIn = async (req, res) => {
	console.log("login");
	console.log(req.body);
	try {
		const { error } = logInBodyValidation(req.body);
		if (error)
			return res
				.status(400)
				.json({ error: true, message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		console.log('tomiiii', user);
		if (!user)
			return res
				.status(401)
				.json({ error: true, message: "Invalid email or password" });

		const verifiedPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (user.roles[0] !== "admin" && user.roles[0] !== "attendant") {
			return res
				.status(401)
				.json({ error: true, message: "Unauthorized user" });
		}
		if (!verifiedPassword)
			return res
				.status(401)
				.json({ error: true, message: "Invalid password" });

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
}

export const logOut = async (req, res) => {
	console.log("logout");
	console.log(req.body);
	 try {
    const { error } = refreshTokenBodyValidation(req.body);
    if (error)
      return res
        .status(400)
        .json({ error: true, message: error.details[0].message });

    const userToken = await UserToken.findOne({ token: req.body.refreshToken });
    if (!userToken)
      return res
        .status(200)
        .json({ error: false, message: "Logged Out Sucessfully" });

    await userToken.deleteOne();
    res.status(200).json({ error: false, message: "Logged Out Sucessfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};logOut;

export const refresh=  async (req, res) => {
	console.log("refresh Backend", req.body);

	const { error } = refreshTokenBodyValidation(req.body);
  if (error)
    return res
      .status(400)
      .json({ error: true, message: error.details[0].message });

	try {
		const { tokenDetails } = await verifyRefreshToken(req.body.refreshToken);



		console.log("am about to geneate token", tokenDetails);
		const payload = { _id: tokenDetails._id, userName: tokenDetails.userName, email: tokenDetails.email, roles: tokenDetails.roles }
		const accessToken = jwt.sign(
			payload,
			process.env.ACCESS_TOKEN_PRIVATE_KEY,
			{ expiresIn: "14m" }
		);
		console.log("Access token created successfully", accessToken);
		res.status(200).json({
			error: false,
			accessToken,
			message: "Access token created successfully",
		});
	} catch (err) {
		res.status(400).json({ error: true, message: err.message });
	}
};

