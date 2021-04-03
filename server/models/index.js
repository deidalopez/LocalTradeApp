const { DataTypes } = require('sequelize');

const sequelize = require('../database');

const Users = sequelize.define('Users', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  longitude: {
    type: DataTypes.DECIMAL(12, 6),
    allowNull: true
  },
  latitude: {
    type: DataTypes.DECIMAL(12, 6),
    allowNull: true
  },
});

const Posts = sequelize.define('Posts', {
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_id: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  longitude: {
    type: DataTypes.DECIMAL(12, 6),
    allowNull: false
  },
  latitude: {
    type: DataTypes.DECIMAL(12, 6),
    allowNull: false
  },
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
