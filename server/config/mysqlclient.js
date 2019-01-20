const Sequelize = require('sequelize');

const database = {
  db: 'database-name',
  user: 'username',
  password: 'password',
  dialect: 'mysql',
  host: 'localhost',
  // use this if you are connecting to a google cloud sql instance
  // where the first part /sqlcloud/ = ins
  dialectOptions: {
    socketPath: '/googlecloudinstance/{projectName}:{zone}:{instance-name}'
  }
}

const sequelize = new Sequelize(database.db, database.user, database.password, {
  dialect: database.dialect,
  host: database.host,
  operatorsAliases: false
});

module.exports = sequelize;
