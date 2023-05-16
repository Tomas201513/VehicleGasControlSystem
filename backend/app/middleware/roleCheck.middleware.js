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
	console.log('roles', req.user.roles)
	const roles = req.user?.roles || [];
	if (roles[0]?.includes("admin")) {
		// console.log('roles', req.user.role)

		next();
	} else {
		res.status(403).json({ error: true, message: "You are not authorized" });
	}
}
export const driver = (req, res, next) => {
	const roles = req.user.roles;
	if (roles.includes("driver")) {
		next();
	} else {
		res.status(403).json({ error: true, message: "You are not authorized" });
	}
}
export const attendant = (req, res, next) => {
	const roles = req.user.roles;
	if (roles.includes("attendant")) {
		next();
	} else {
		res.status(403).json({ error: true, message: "You are not authorized" });
	}
}

export const adminAttendant = (req, res, next) => {
	console.log('roles', req.user.roles)
	const roles = req.user?.roles || [];
	if (roles[0]?.includes("admin") || roles[0]?.includes("attendant")) {
		// console.log('roles', req.user.role)

		next();
	} else {
		console.log('oooooooooooooooooooooooooooooooo' + roles)
		res.status(403).json({ error: true, message: "You are not authorized" });
	}
}


export const attendantDriver = (req, res, next) => {
	const roles = req.user.roles;
	if (roles.includes("attendant") || roles.includes("driver")) {
		next();
	} else {
		res.status(403).json({ error: true, message: "You are not authorized" });
	}
}

export const attendatAttendantDriver = (req, res, next) => {
	const roles = req.user.roles;
	if (roles.includes("attendant") || roles.includes("driver") || roles.includes("admin")) {
		next();
	} else {
		res.status(403).json({ error: true, message: "You are not authorized" });
	}
}
