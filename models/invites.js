module.exports = (sequelize, DataTypes) => {
  var invites = sequelize.define ('invites', {
  	to: DataTypes.STRING,
    from: DataTypes.STRING,
    group_id: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  });
  
  return invites;
}