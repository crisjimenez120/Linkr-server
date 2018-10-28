module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('users', {
    first: DataTypes.STRING,
    last: DataTypes.STRING,
    day: DataTypes.STRING,
    event_start: DataTypes.TIME,
    event_end: DataTypes.TIME
  });

  users.associate = (models) => {
    // associations can be defined here
  }

  return users;
};


// module.exports = (sequelize, DataTypes) => {
//   var Posts = sequelize.define('Posts', {
//     post: DataTypes.TEXT,
//     author: DataTypes.STRING
//   });

//   Posts.associate = (models) => {
//     // associations can be defined here
//   }

//   return Posts;
// };

/*
module.exports = (sequelize, DataTypes) => {
  var Posts = sequelize.define('Posts', {
    first: DataTypes.STRING,
    last: DataTypes.STRING,
    Sunday: DataTypes.TIME,
    Monday: DataTypes.TIME,
    Tuesday: DataTypes.TIME,
    Wednesday: DataTypes.TIME,
    Thursday: DataTypes.TIME,
    Friday: DataTypes.TIME,
    Saturday: DataTypes.TIME
  });

  Posts.associate = (models) => {
    // associations can be defined here
  }

  return Posts;
};
*/