module.exports = (sequelize, DataTypes) => {
  var groups = sequelize.define ('groups', {
    group_name: DataTypes.STRING,
    group_desc: DataTypes.STRING,
    admin: DataTypes.STRING
  });
  
  return groups;
}