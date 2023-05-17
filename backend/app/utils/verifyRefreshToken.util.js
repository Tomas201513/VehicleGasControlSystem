import UserToken from "../models/userToken.model.js"
import jwt from "jsonwebtoken";

const verifyRefreshToken = async (refreshToken) => {
  console.log("verifyRefreshToken", refreshToken);

  try {
    const doc = await UserToken.findOne({ token: refreshToken });

    if (!doc) {
      throw new Error("Invalid refresh token");
    }

    const tokenDetails = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_PRIVATE_KEY
    );
    console.log("Valid refresh token", tokenDetails);

    return {
      tokenDetails,
      error: false,
      message: "Valid refresh token",
    };
  } catch (err) {
    console.log("errrrrrr verifyRefreshToken", err);
    throw new Error(err.message);
  }
};

export default verifyRefreshToken;
