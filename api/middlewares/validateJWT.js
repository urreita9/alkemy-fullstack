const { request } = require('express');
const jwt = require('jsonwebtoken');

const { ACCESS_TOKEN_SECRET } = process.env;

const validateJWT = (req = request, res, next) => {
	const token = req.headers.authorization.split(' ')[1];
	if (!token) {
		return res.status(401).json({ msg: 'No token in request' });
	}

	try {
		const { id } = jwt.verify(token, ACCESS_TOKEN_SECRET);

		req.id = id;

		next();
	} catch (error) {
		console.log(error);
		res.status(401).json({ msg: 'Invalid token' });
	}
};

module.exports = { validateJWT };
