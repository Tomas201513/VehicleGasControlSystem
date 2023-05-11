import express from "express";
import cors from "cors";
import { config } from "dotenv";
import dbConnect from "./app/config/database.config.js"
const app = express();
import authRoutes from "./app/routes/auth.routes.js"
import carRoutes from "./app/routes/car.routes.js"
import userRoute from "./app/routes/user.routes.js"
import fuelRoute from "./app/routes/fuel.routes.js"
import tankerRoute from "./app/routes/tanker.routes.js"
config();
dbConnect();

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoute);
app.use("/api/cars", carRoutes);
app.use("/api/fuel", fuelRoute);
app.use("/api/tankers", tankerRoute);


app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT || 5000}`));
