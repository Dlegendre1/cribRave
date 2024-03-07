'use strict';

const { Comment, Sequelize } = require('../models/comment');
const bcrypt = require('bcryptjs');


let options = {};
options.tableName = 'Comments';

if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
}

module.exports = {
    up: async (queryInterface, Sequelize) => {
        options.tableName = "Comments";
        return queryInterface.bulkInsert(options, [
            {
                userId: 1,
                postId: 1,
                commentText: "Testing, attention please"
            },
            {
                userId: 2,
                postId: 2,
                commentText: "Testing, attention please"
            },
            {
                userId: 3,
                postId: 3,
                commentText: "Testing, attention please"
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        options.tableName = "Comments";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
            postId: { [Op.in]: [1, 2, 3] }
        });
    }
};
