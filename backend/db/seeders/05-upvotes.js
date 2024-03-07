'use strict';

const { Post, Sequelize } = require('../models/upvote');
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
                postId: 1,
                isUpvote: true
            },
            {
                userId: 2,
                postId: 1,
                isUpvote: false
            },
            {
                userId: 1,
                postId: 1,
                isUpvote: true
            }
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        options.tableName = "Upvotes";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
            userId: { [Op.in]: [1, 2] }
        });
    }
};
