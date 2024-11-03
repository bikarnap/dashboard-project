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

class Pool extends Model {}

Pool.init({
  id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      field: 'id'
  },
  poolName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'pool_name'
  },
  poolMaster: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'pool_master'
  },
  masterIP: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'master_ip'
  },
  username: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'username'
  },
  password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'password'
  }

}, {
  sequelize,
  tableName: 'pools',
  timestamps: false
});

module.exports = Pool;