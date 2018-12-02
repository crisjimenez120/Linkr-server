module.exports = (sequelize, DataTypes) => {
  var groups_to_user = sequelize.define ('groups_to_user', {
    group_id: DataTypes.INTEGER,
    user_email: DataTypes.STRING
  });
  
  return groups_to_user;
}