'use strict';

const { Post, Sequelize } = require('../models/post');
const bcrypt = require('bcryptjs');


let options = {};
options.tableName = 'Posts';

if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
}

module.exports = {
    up: async (queryInterface, Sequelize) => {
        options.tableName = "Posts";
        return queryInterface.bulkInsert(options, [
            {
                userId: 1,
                title: "I love cribbage!!",
                description: "It's the best game!",
            },
            {
                userId: 2,
                title: "I hate cribbage!!",
                description: "It's the worst game!",
            },
            {
                userId: 3,
                title: "I love cribbage even more!!",
                description: "It really is the best game!",
            },
        ], {});
    },


    down: async (queryInterface, Sequelize) => {
        options.tableName = "Posts";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
            userId: { [Op.in]: [1, 2, 3] }
        });
    }

};
