const { Router } = require('express');

const router = Router();

router.get('/hello', (req, res) => {
	res.status(200).json({
		msg: 'Hello World!',
	});
});

module.exports = router;
