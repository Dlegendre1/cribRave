'use strict';

const { User, Sequelize } = require('../models/user');
const bcrypt = require('bcryptjs');


let options = {};
options.tableName = 'Users';

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {


  up: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    return queryInterface.bulkInsert(options, [
      {
        firstName: 'Demo',
        lastName: 'User',
        email: 'demouser@demo.com',
        username: 'demouser',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Crib',
        lastName: 'Hater',
        email: 'cribhater@demo.com',
        username: 'CribHater',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Crib',
        lastName: 'Lover',
        email: 'criblover@demo.com',
        username: 'CribLover',
        hashedPassword: bcrypt.hashSync('password')
      }
    ], {});
  },



  down: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ["demouser", "CribHater45", "CribLover99"] }
    });
  }
};
