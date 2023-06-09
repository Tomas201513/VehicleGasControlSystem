import jwt from "jsonwebtoken";
import UserToken from "../models/userToken.model.js"

const generateTokens = async (user) => {
  console.log("generateTokens", user);
  try {
    const payload = { _id: user._id, userName: user.userName, email: user.email, roles: user.roles }
    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_PRIVATE_KEY,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_PRIVATE_KEY,
      { expiresIn: "30d" }
    );

    const userToken = await UserToken.findOne({ userId: user._id });
    if (userToken) await UserToken.deleteOne({ userId: user._id });

    await new UserToken({ userId: user._id, token: refreshToken }).save();
    return Promise.resolve({ accessToken, refreshToken });
  } catch (err) {
    return Promise.reject(err);
  }
};

export default generateTokens;
