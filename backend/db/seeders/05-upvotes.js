'use strict';

const { Post, Sequelize } = require('../models');
const bcrypt = require('bcryptjs');


let options = {};
options.tableName = 'Upvotes';

if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
}

module.exports = {
    up: async (queryInterface, Sequelize) => {
        options.tableName = "Upvotes";
        return queryInterface.bulkInsert(options, [
            {
                userId: 1,
                typeId: 0,
                isUpvote: true
            },
            {
                userId: 2,
                typeId: 0,
                isUpvote: false
            },
            {
                userId: 1,
                typeId: 1,
                isUpvote: true
            }
        ]);
    }
};
