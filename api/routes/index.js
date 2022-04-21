require('dotenv').config();
const { check } = require('express-validator');
const { Router } = require('express');
const { postRegister, postLogin } = require('../controllers/auth');
const { getOperations, postOperation } = require('../controllers/operations');
const { validateJWT } = require('../middlewares/validateJWT');

const router = Router();

router.post(
	'/auth/register',
	[
		check('email', 'Must be an email').isEmail(),
		check('password', 'Password must be at least 6 characters long').isLength({
			min: 6,
		}),
	],
	postRegister
);

router.post(
	'/auth/login',
	[
		check('email', 'Must be an email').isEmail(),
		check('password', 'Password must be at least 6 characters long').isLength({
			min: 6,
		}),
	],
	postLogin
);

router.get('/operations/:id', validateJWT, getOperations);
router.post('/operation', validateJWT, postOperation);

module.exports = router;
