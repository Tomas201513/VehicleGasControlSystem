import express from "express";
import { config } from "dotenv";
import dbConnect from "./app/config/database.config.js"
import authRoutes from "./app/routes/auth.routes.js"
import userRoutes from "./app/routes/user.routes.js"
import refreshTokenRoutes from "./app/routes/refreshToken.routes.js"

const app = express();

config();
dbConnect();

app.use(express.json());

app.use("/api", authRoutes); // /api/signUp
app.use("/api/refreshToken", refreshTokenRoutes); // /api/refreshToken
app.use("/api/users", userRoutes); // /api/users

app.listen(process.env.PORT  || 5000 , () => console.log(`Listening on port ${process.env.PORT || 5000}`));
