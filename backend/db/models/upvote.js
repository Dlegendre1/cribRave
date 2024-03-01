'use strict';
const {
    Model,
    Validator
} = require('sequelize');
const { sequelize } = require('.');

module.exports = (sequelize, DataTypes) => {
    class Upvote extends Model {



        static associate(models) {
            Upvote.belongsTo(models.Post, { foreignKey: typeId });
            Upvote.belongsTo(models.Comment, { foreignKey: typeId });
        }
    }
    Upvote.init({
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        typeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isUpvote: {
            type: DataTypes.BOOLEAN
        }
    });
    return Upvote;
};
