'use strict';
const {
    Model,
    Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Card extends Model {
        static associate(models) {
            Card.belongsTo(models.CribbageGame, { foreignKey: "gameId" });

        }
    }
    Card.init({
        gameId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        value: {
            type: DataTypes.INTEGER
        },
        suit: {
            type: DataTypes.INTEGER
        },
        positionInDeck: {
            type: DataTypes.INTEGER
        },
        playerHolding: {
            type: DataTypes.INTEGER
        },
        flopCard: {
            type: DataTypes.BOOLEAN
        },
        cribCard: {
            type: DataTypes.BOOLEAN
        }
    }, {
        sequelize,
        modelName: 'Card',
        defaultScope: {}
    });
    return Card;
};
