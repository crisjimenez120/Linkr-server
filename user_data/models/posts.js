module.exports = (sequelize, DataTypes) => {
  var Posts = sequelize.define('Posts', {
    first: DataTypes.STRING,
    last: DataTypes.STRING,
  });

  Posts.associate = (models) => {
    // associations can be defined here
  }

  return Posts;
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