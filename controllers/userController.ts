import * as mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
const User = mongoose.model("User");

// https://mongoosejs.com/docs/queries.html

// POST -- Login
// POST Body: email<String>, password_plain<String>
export const login = async (req: Request, res: Response, next: NextFunction) => {
	// Confirm Required POST Body Fields
	if (!req.body.email) return res.status(422).send("Missing email");
	if (!req.body.password_plain) return res.status(422).send("Missing password_plain");

	const user = await User.findOne({ email: req.body.email });
	if (user) {
		return res.status(200).json(user);
	} else {
		return res.sendStatus(400).send("User not found");
	}
};

// POST -- Signup
// POST Body: email<String>, password_plain<String>, firstName<String>, lastName<String>, phone<int32>, address<String>
export const signup = async (req: Request, res: Response, next: NextFunction) => {
	// Confirm Required POST Body Fields
	if (!req.body.email) return res.status(422).send("Missing email");
	if (!req.body.password_plain) return res.status(422).send("Missing password_plain");
	if (!req.body.firstName) return res.status(422).send("Missing firstName");
	if (!req.body.lastName) return res.status(422).send("Missing lastName");
	if (!req.body.phone) return res.status(422).send("Missing phone");
	if (!req.body.address) return res.status(422).send("Missing address");

	// Check if User Already Exists in DB
	const user = await User.findOne({ email: req.body.email });
	if (user) {
		return res.status(400).send("User already exists");
	}

	// Create New User in DB
	try {
		const newUser = await User.create({
			email: req.body.email,
			password_plain: req.body.password_plain,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			phone: req.body.phone,
			address: req.body.address
		});
		return res.status(200).json(newUser);
	} catch (err) {
		return res.status(500);
	}
};
