require('dotenv').config();
const { Sequelize } = require('sequelize');

const modelOperation = require('../models/Operation.js');
const modelUser = require('../models/User.js');

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

let sequelize =
	process.env.NODE_ENV === 'production'
		? new Sequelize({
				database: DB_NAME,
				dialect: 'postgres',
				host: DB_HOST,
				port: 5432,
				username: DB_USER,
				password: DB_PASSWORD,
				pool: {
					max: 3,
					min: 1,
					idle: 10000,
				},
				dialectOptions: {
					ssl: {
						require: true,
						rejectUnauthorized: false,
					},
					keepAlive: true,
				},
				ssl: true,
		  })
		: new Sequelize(
				`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
				{
					logging: false,
					native: false,
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
