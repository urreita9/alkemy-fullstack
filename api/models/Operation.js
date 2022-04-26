const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('Operation', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		amount: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		opType: {
			type: DataTypes.ENUM('income', 'expense'),
			allowNull: false,
		},
		active: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true,
		},
	});
};
