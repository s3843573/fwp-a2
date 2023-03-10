'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' })
      this.belongsTo(models.Post, { foreignKey: 'postId' })
      this.hasMany(models.Reaction, { onDelete: 'CASCADE' })
    }
  }
  Comment.init(
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      parentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Comment',
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  )
  return Comment
}
