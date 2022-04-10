require('dotenv').config();
const { Sequelize } = require('sequelize');

const modelOperation = require('../models/Operation.js');
const modelUser = require('../models/User.js');

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
	`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/alkemy`,
	{
		logging: false, // set to console.log to see the raw SQL queries
		native: false, // lets Sequelize know we can use pg-native for ~30% more speed
	}
);

modelOperation(sequelize);
modelUser(sequelize);

const { Operation, User } = sequelize.models;

User.hasMany(Operation);
Operation.belongsTo(User);

module.exports = {
	...sequelize.models,
	db: sequelize,
};
