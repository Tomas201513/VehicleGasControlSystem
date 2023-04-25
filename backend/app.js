import express from "express";
import { config } from "dotenv";
import dbConnect from "./app/config/database.config"
import authRoutes from "./app/routes/auth.routes"
import userRoutes from "./app/routes/user.routes"
import refreshTokenRoutes from "./app/routes/refreshToken.routes"

const app = express();

config();
dbConnect();

app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/refreshToken", refreshTokenRoutes);
app.use("/api/users", userRoutes);

const port = process.env.POR;
app.listen(port, () => console.log(`Listening on port ${port}...`));
