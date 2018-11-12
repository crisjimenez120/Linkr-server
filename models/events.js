module.exports = (sequelize, DataTypes) => {
	var events = sequelize.define ('events', {
		title: Sequelize.STRING,
		start: Sequelize.DATE,
		end: Sequelize.DATE
	});

	return events;
}

