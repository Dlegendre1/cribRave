'use strict';
const {
    Model,
    Validator
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Image extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Image.belongsTo(models.User, { foreignKey: "userId" });
            Image.belongsTo(models.Post, { foreignKey: "postId" });
        }
    }
    Image.init({
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        postId: {
            type: DataTypes.INTEGER
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Image',
        defaultScope: {}
    });
    return Image;
};
