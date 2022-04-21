const { User, Operation } = require('../db/db');

const getOperations = async (req, res) => {
	const { id } = req.params;

	try {
		const user = await User.findByPk(id);

		if (!user) return res.status(404).json({ msg: 'User does not exist' });

		const operations = await Operation.findAll({
			where: {
				UserId: id,
			},
		});
		return res.json({ operations });
	} catch (error) {
		return res.status(500).json({ msg: 'Sorry, something went wrong.', error });
	}
};

const postOperation = async (req, res) => {
	const { id, description, amount, opType } = req.body;

	if (opType !== 'income' && opType !== 'outcome')
		return res.status(401).json({
			msg: 'Wrong request. Operation Type must be "income" or "outcome"',
		});

	try {
		const user = await User.findByPk(id);
		if (!user) return res.status(404).json({ msg: 'User does not exist' });

		console.log(user);
		const operation = await Operation.create({
			description,
			amount,
			opType,
			date: new Date(),
			UserId: user.id,
		});

		return res.status(201).json(operation);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ msg: 'Sorry, something went wrong.', error });
	}
};

module.exports = {
	getOperations,
	postOperation,
};
