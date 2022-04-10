require('dotenv').config();
const { check } = require('express-validator');
const { Router } = require('express');
const { loginPost } = require('../controllers/auth');

const router = Router();

router.post(
	'/auth/login',
	[
		check('email', 'Must be an email').isEmail(),
		check('password', 'Password must be at least 6 characters long').isLength({
			min: 6,
		}),
	],
	loginPost
);

module.exports = router;
