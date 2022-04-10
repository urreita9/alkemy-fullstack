require('dotenv').config();
const { Router } = require('express');
const { getHello } = require('../controllers/controllers');

const router = Router();

router.get('/hello', getHello);

module.exports = router;
