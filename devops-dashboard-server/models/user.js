const {
  Sequelize
  , Model
  , DataTypes
} = require('sequelize');

let sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.db',
  logging: console.log

});

class User extends Model {}

User.init({
  id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      field: 'id'
  },
  username: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'username'
  },
  passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'password_hash'
  },
  fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'full_name'
  },
}, {
  sequelize,
  tableName: 'users',
  timestamps: false
});

module.exports = User;