const { validationResult } = require('express-validator');

const bcryptjs = require('bcryptjs');

const { User } = require('../db/db');

const { generateJWT } = require('../helpers/generateJWT');

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

	res.status(201).json({ id: user.id, email: user.email });
};

const postLogin = async (req, res) => {
	// Check errors in request body
	console.log('entro');
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

	const token = await generateJWT(user.id);

	res.status(200).json({ user: { id: user.id, email: user.email }, token });
};

const getUser = async (req, res) => {
	const { id } = req.body;

	try {
		const user = await User.findByPk(id);

		if (!user) return res.status(400).json({ msg: 'Wrong credentials' });

		return res.json({ id: user.id, email: user.email });
	} catch (error) {
		return res.status(400).json({ msg: error });
	}
};
module.exports = {
	postRegister,
	postLogin,
	getUser,
};
