const { User, Operations } = require('../db/db');

const getOperations = async (req, res) => {
	const { id } = req.params;

	try {
		const user = await User.findByPk(id);

		if (!user) return res.status(404).json({ msg: 'User does not exist' });

		const operations = await Operations.findAll({
			where: {
				UserId: id,
			},
		});
		return res.json({ operations });
	} catch (error) {
		return res.status(500).json({ msg: 'Sorry, something went wrong.' });
	}
};

const postOperation = async (req, res) => {
	try {
	} catch (error) {}
};

module.exports = {
	getOperations,
	postOperation,
};
