'use strict';
const {
    Model,
    Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Game extends Model {
        static associate(models) {;

        }
    }
    Game.init({
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cribHolder: {
            type: DataTypes.INTEGER
        },
        nonCribHolder: {
            type: DataTypes.INTEGER,
        },
        currentPlayer: {
            type: DataTypes.INTEGER
        },
        deckPosition: {
            type: DataTypes.INTEGER
        },
        round: {
            type: DataTypes.INTEGER
        },
        roundPhase: {
            type: DataTypes.INTEGER
        },
        peggingRound: {
            type: DataTypes.INTEGER
        },
        peggingSubRound: {
            type: DataTypes.INTEGER
        },

    }, {
        sequelize,
        modelName: 'Game',
        defaultScope: {}
    });
    return Game;
};
