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

		const activeOperations = operations.filter(
			(operation) => operation.active === true
		);

		return res.json(activeOperations);
	} catch (error) {
		return res.status(500).json({ msg: 'Sorry, something went wrong.', error });
	}
};

const postOperation = async (req, res) => {
	const { id, description, amount, opType } = req.body;

	if (opType !== 'income' && opType !== 'expense')
		return res.status(401).json({
			msg: 'Wrong request. Operation Type must be "income" or "expense"',
		});

	try {
		const user = await User.findByPk(id);
		if (!user) return res.status(404).json({ msg: 'User does not exist' });

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
		return res.status(400).json({ msg: 'Sorry, something went wrong.', error });
	}
};

const updateOperation = async (req, res) => {
	const { active, ...resto } = req.body;
	const { id } = req.params;

	try {
		const user = await User.findByPk(req.body.uid);
		if (!user) return res.status(404).json({ msg: 'User does not exist' });

		const operation = await Operation.findByPk(id);

		if (!operation)
			return res.status(404).json({ msg: 'Operation does not exist' });

		const { opType } = operation;

		const updatedOperation = await operation.update({
			...operation,
			...resto,
			opType,
			active,
		});

		return res.json(updatedOperation);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ msg: 'Sorry, something went wrong.', error });
	}
};

module.exports = {
	getOperations,
	postOperation,
	updateOperation,
};
