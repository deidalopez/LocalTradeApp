const { DataTypes } = require('sequelize');

const db = require('../database');

const Users = db.define('Users', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // id: {
  //   type: DataTypes.INTEGER, 
  //   allowNull:true,
  //   primaryKey:true
  // },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

const Posts = db.define('Posts', {
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})

const associationOpts = {
  foreignKey: 'user_id',
  as: 'posts'
};

Posts.belongsTo(Users, associationOpts);
Users.hasMany(Posts, associationOpts);

module.exports = {
  Users,
  Posts,
}

//ADD a location feature to the user or to the posts. probably to the posts 
//https://lorenstewart.me/2016/10/03/sequelize-crud-101/