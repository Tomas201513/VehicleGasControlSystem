// const roleCheck = (roles) => {
// 	return (req, res, next) => {
// 		roles.push("user");
// 		if (req.user.roles.includes(...roles)) {
// 			next();
// 		} else {
// 			res.status(403).json({ error: true, message: "You are not authorized" });
// 		}
// 	};
// };

// export default roleCheck;

export const admin = (req, res, next) => {
	const role = req.user.role;
	if (role[0].includes("admin")) {
		// console.log('roles', req.user.role)

		next();
	} else {
		res.status(403).json({ error: true, message: "You are not authorized" });
	}
}

export const driver = (req, res, next) => {
	const role = req.user.role;
	if (role.includes("driver")) {
		next();
	} else {
		res.status(403).json({ error: true, message: "You are not authorized" });
	}
}

export const attendant = (req, res, next) => {
	const role = req.user.role;
	if (role.includes("attendant")) {
		next();
	} else {
		res.status(403).json({ error: true, message: "You are not authorized" });
	}
}
