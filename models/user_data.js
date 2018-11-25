module.exports = (sequelize, DataTypes) => {

  var user_data = sequelize.define('user_data', {
    user_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    //user_id is the auto incremented ID
  });

  user_data.associate = (models) => {
    // associations can be defined here
  }

  return user_data;
};