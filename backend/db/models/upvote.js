'use strict';
const {
    Model,
    Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Upvote extends Model {



        static associate(models) {
            Upvote.belongsTo(models.User, { foreignKey: "userId" });
            Upvote.belongsTo(models.Post, { foreignKey: "postId" });
            Upvote.belongsTo(models.Comment, { foreignKey: "commentId" });
        }
    }
    Upvote.init({
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        postId: {
            type: DataTypes.INTEGER,
        },
        commentId: {
            type: DataTypes.INTEGER,
        },
        isUpvote: {
            type: DataTypes.BOOLEAN
        }
    }, {
        sequelize,
        modelName: 'Upvote',
        defaultScope: {}
    });
    return Upvote;
};
