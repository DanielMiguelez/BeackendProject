'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     
      Product.belongsToMany(models.Category, {
        through: 'CategoryProduct',  // Nombre de la tabla intermedia
        foreignKey: 'ProductId',     // Clave foránea en la tabla intermedia
        otherKey: 'CategoryId',     // Clave foránea en la tabla intermedia
        as: 'categories'            // Alias para la relación
      });
     
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};