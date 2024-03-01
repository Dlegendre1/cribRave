'use strict';

const {User, Sequelize} = require('../models');
const bcrypt = require('bcryptjs');


let options = {};
options.tableName = 'Users';

if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA;
}

module.exports = {


    up: async (queryInterface, Sequelize) => {
      options.tableName = "Users";
      return queryInterface.bulkInsert(options, [
        {
          email: 'demo@user.io',
          username: 'demouser',
          hashedPassword: bcrypt.hashSync('password'),
          profileImg: ''
        },
        {
          email: 'user1@user1.io',
          username: 'CribHater45',
          hashedPassword: bcrypt.hashSync('password'),
          profileImg: ''
        },
        {
          email: 'user2@user2.io',
          username: 'CribLover99',
          hashedPassword: bcrypt.hashSync('password'),
          profileImg: ''
        }
      ], {})
    },



    down: async (queryInterface, Sequelize) => {
      options.tableName = "Users";
      const Op = Sequelize.Op;
      return queryInterface.bulkDelete(options, {
        username: {[Op.in]: ["demouser", "CribHater45", "CribLover99"]}
      })
    }
  }
