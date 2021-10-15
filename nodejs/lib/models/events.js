const {
	Model,
} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Events extends Model {
		static associate(models) {
			Events.belongsTo(models.Users, {foreignKey: "userId", onDelete: "cascade"});
		}
	}
	Events.init({
		name: DataTypes.TEXT,
		startTime: DataTypes.DATE,
		endTime: DataTypes.DATE,
		descriptions: DataTypes.TEXT,
		isActive: DataTypes.BOOLEAN,
		userId: DataTypes.INTEGER,
	}, {
		sequelize,
		modelName: "Events",
	});

	return Events;
};
