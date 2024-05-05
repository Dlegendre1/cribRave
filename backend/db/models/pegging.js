'use strict';
const {
    Model,
    Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Pegging extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

        }
    }
    Pegging.init({
        gameId: {
            type: DataTypes.INTEGER,
        },
        cardValue: {
            type: DataTypes.INTEGER,
        },
        cardSuit: {
            type: DataTypes.INTEGER
        },
        positionPlayed: {
            type: DataTypes.INTEGER
        },
        peggingTotal: {
            type: DataTypes.INTEGER
        },
        peggingRound: {
            type: DataTypes.INTEGER
        },
        subRound: {
            type: DataTypes.INTEGER
        }
    }, {
        sequelize,
        modelName: 'Pegging',
        defaultScope: {}
    });
    return Pegging;
};
