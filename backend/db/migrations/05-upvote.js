'use strict';

let options = {};
options.tableName = 'Posts';
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
                primaryKey: trues
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users'
                }
            },
            typeId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Posts',
                    model: 'Comments'
                }
            },
        }, options);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.dropTable(options);
    }
};
