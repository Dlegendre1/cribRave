'use strict';
const {
    Model,
    Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Player extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

        }
    }
    Player.init({
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        wins: {
            type: DataTypes.INTEGER,
        },
        loses: {
            type: DataTypes.INTEGER,
        },
        username: {
            types: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: 'Player',
        defaultScope: {}
    });
    return Player;
};
