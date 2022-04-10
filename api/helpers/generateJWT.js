const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = process.env;

const generateJWT = (id) => {
	return new Promise((resolve, reject) => {
		jwt.sign(id, ACCESS_TOKEN_SECRET, (err, token) => {
			if (err) {
				console.log(err);
				reject('Couldnt generate token');
			} else {
				resolve(token);
			}
		});
	});
};

module.exports = { generateJWT };
