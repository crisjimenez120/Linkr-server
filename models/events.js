module.exports = (sequelize, DataTypes) => {
  var events = sequelize.define ('events', {
    title: DataTypes.STRING,
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    user_email: DataTypes.STRING // only works if in sequlize the auto incremented id is INT
  });
  
  return events;
}
