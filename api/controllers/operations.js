const getOperations = async (req, res) => {
	const id = req.id;

	res.json({ id });
};

module.exports = {
	getOperations,
};
