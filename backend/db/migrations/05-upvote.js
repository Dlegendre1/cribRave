'use strict';

let options = {};
options.tableName = 'Upvotes';
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
}

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(options, {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            isUpvote: {
                type: Sequelize.BOOLEAN,
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users'
                }
            },
            postId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Posts',
                }
            },
            commentId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Comments',
                }
            },
        }, options);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.dropTable(options);
    }
};
