module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('users', {
    user_name: DataTypes.STRING,
    event_name: DataTypes.STRING,
    date: DataTypes.DATE,
    time_start: DataTypes.TIME,
    time_end: DataTypes.TIME
  });

  users.associate = (models) => {
    // associations can be defined here
  }

  return users;
};
