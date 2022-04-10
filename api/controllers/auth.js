const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const { User } = require('../db/db');

const postRegister = async (req, res) => {
	// Check errors in request body
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json(errors);
	}

	const { email, password } = req.body;

	// Verify if email exists on db
	const existEmail = await User.findOne({ where: { email } });

	if (existEmail) {
		return res.status(400).json({ msg: 'Email already exists' });
	}

	// Hash password
	const salt = bcryptjs.genSaltSync();
	const hashedPassword = bcryptjs.hashSync(password, salt);

	// Save on db
	const user = await User.create({ email, password: hashedPassword });

	res.status(201).json(user);
};

const postLogin = async (req, res) => {
	// Check errors in request body
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json(errors);
	}

	const { email, password } = req.body;

	// Verify if email exists on db
	const user = await User.findOne({ where: { email } });

	if (!user) {
		return res.status(400).json({ msg: 'Wrong Email or Password' });
	}

	// Compare password with hashed password in db
	const comparePassword = bcryptjs.compareSync(password, user.password);

	if (!comparePassword) {
		return res.status(400).json({ msg: 'Wrong Email or Password' });
	}

	res.status(200).json(user);
};

module.exports = {
	postRegister,
	postLogin,
};
