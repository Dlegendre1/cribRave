'use strict';
const {
  Model,
  Validator,
  DataTypes
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {



    static associate(models) {
      Comment.belongsTo(models.User, { foreignKey: "userId" });
      Comment.belongsTo(models.Post, { foreignKey: "postId" });
      Comment.hasMany(models.Upvote, { foreignKey: "commentId" });
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
    },
    
  }, {
    sequelize,
    modelName: "Comment",
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    }
  });
  return Comment;
};
