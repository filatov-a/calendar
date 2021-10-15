module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Events", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			startTime: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			endTime: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			descriptions: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			isActive: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
			userId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {model: "Users", key: "id"},
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: new Date(),
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: new Date(),
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("Events");
	},
};
