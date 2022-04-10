const jwt = require('jsonwebtoken');

const { ACCESS_TOKEN_SECRET } = process.env;

const validateJWT = (req, res, next) => {
	const token = req.header('x-token');
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
