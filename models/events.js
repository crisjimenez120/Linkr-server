module.exports = (sequelize, DataTypes) => {
  var events = sequelize.define ('events', {
    title: DataTypes.STRING,
    start: DataTypes.DATE,
    end: DataTypes.DATE
  });
  
  return events;
}
