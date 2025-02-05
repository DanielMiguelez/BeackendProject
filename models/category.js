'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.belongsToMany(models.Product, {
        through: 'CategoryProduct', // Nombre de la tabla intermedia
        foreignKey: 'CategoryId',   // Clave foránea en la tabla intermedia
        otherKey: 'ProductId',      // Clave foránea en la tabla intermedia
        as: 'products'
      });
    }
  }
  Category.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};