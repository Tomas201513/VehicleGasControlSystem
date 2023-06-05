import mongoose from "mongoose";
import User from "../models/user.model.js"; const dbConnect = async () => {
	const connectionParams = { useNewUrlParser: true };
	mongoose.connect(process.env.DB, connectionParams);

	mongoose.connection.on("connected", async () => {
		console.log("Connected to database sucessfully");

		const adminUser = new User({
			userName: 'admin',
			email: 'admin@admin.com',
			password: 'admin',
			roles: ['admin']
		});
		try {
			const existingUser = await User.findOne({ email: adminUser.email });
			console.log(adminUser.email);
			console.log(existingUser);
			if (!existingUser) {
				await adminUser.save();
				console.log('Admin user created successfully');
			} else {
				console.log('Admin user already exists');
			}
		} catch (err) {
			console.error(err);
		}
	});

	mongoose.connection.on("error", (err) => {
		console.log("Error while connecting to database :" + err);
	});

	mongoose.connection.on("disconnected", () => {
		console.log("Mongodb connection disconnected");
	});
};

export default dbConnect;
