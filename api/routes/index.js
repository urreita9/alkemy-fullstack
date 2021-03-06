require('dotenv').config();
const { check } = require('express-validator');
const { Router } = require('express');
const { postRegister, postLogin, getUser } = require('../controllers/auth');
const {
	getOperations,
	postOperation,
	updateOperation,
} = require('../controllers/operations');
const { validateJWT } = require('../middlewares/validateJWT');

const router = Router();

//

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
router.get('/user', validateJWT, getUser);

router.get('/operations/:id', validateJWT, getOperations);
router.post('/operation', validateJWT, postOperation);
router.put('/operation/:id', validateJWT, updateOperation);

module.exports = router;
