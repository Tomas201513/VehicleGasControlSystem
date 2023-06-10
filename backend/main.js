import express from "express";
import cors from "cors";
import { config } from "dotenv";
import dbConnect from "./src/config/database.config.js"
const app = express(); 
import authRoutes from "./src/routes/auth.routes.js"
import carRoutes from "./src/routes/car.routes.js"
import userRoute from "./src/routes/user.routes.js"
import fuelRoute from "./src/routes/fuel.routes.js"
import stationRoute from "./src/routes/station.routes.js"
import quotaRoute from "./src/routes/quota.routes.js"
config();
dbConnect();

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoute);
app.use("/api/cars", carRoutes);
app.use("/api/fuel", fuelRoute);
app.use("/api/stations", stationRoute);
app.use("/api/quotas", quotaRoute);


app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT || 5000}`));
