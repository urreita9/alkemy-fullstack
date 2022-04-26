const { validationResult } = require('express-validator');

const bcryptjs = require('bcryptjs');

const { User } = require('../db/db');

const { generateJWT } = require('../helpers/generateJWT');

const postRegister = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json(errors);
	}

	const { email, password } = req.body;

	const existEmail = await User.findOne({ where: { email } });

	if (existEmail) {
		return res.status(400).json({ msg: 'Email already exists' });
	}

	const salt = bcryptjs.genSaltSync();
	const hashedPassword = bcryptjs.hashSync(password, salt);

	const user = await User.create({ email, password: hashedPassword });

	res.status(201).json({ id: user.id, email: user.email });
};

const postLogin = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors, auth: false });
	}

	const { email, password } = req.body;

	const user = await User.findOne({ where: { email } });

	if (!user) {
		return res
			.status(400)
			.json({ msg: 'Wrong Email or Password', auth: false });
	}

	const comparePassword = bcryptjs.compareSync(password, user.password);

	if (!comparePassword) {
		return res
			.status(400)
			.json({ msg: 'Wrong Email or Password', auth: false });
	}

	const token = await generateJWT(user.id);

	res
		.status(200)
		.json({ user: { id: user.id, email: user.email }, token, auth: true });
};

const getUser = async (req, res) => {
	try {
		const user = await User.findByPk(req.id);

		if (!user) return res.status(400).json({ msg: 'Wrong credentials' });

		return res.json({
			user: { id: user.dataValues.id, email: user.dataValues.email },

			auth: true,
		});
	} catch (error) {
		return res.status(400).json({ msg: error });
	}
};
module.exports = {
	postRegister,
	postLogin,
	getUser,
};
