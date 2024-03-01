'use strict';
const {
  Model,
  Validator,
  DataTypes
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends model {



    static associate(models) {
      Comment.belongsTo(models.User, { foreignKey: 'userId' });
      Comment.belongsTo(models.Post, { foreignKey: 'postId' });
    }
  }
  Comment.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    commentText: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Comment',
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    }
  });
  return Comment;
};
