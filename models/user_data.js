const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {

  var user_data = sequelize.define('user_data', {
    user_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    //user_id is the auto incremented ID
  });

   user_data.beforeCreate((user) => new sequelize.Promise((resolve) => {

      bcrypt.hash(user.password, null, null, (err, hashedPassword) => {
        resolve(hashedPassword);
      });
      
    }).then((hashedPw) => {
      user.password = hashedPw;
    })
  );


  return user_data;
};