'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relación uno a muchos con User
      Order.belongsTo(models.User, { foreignKey: 'userId' });

      // Relación muchos a muchos con Product
      Order.belongsToMany(models.Product, {
        through: 'OrderProduct',  // Nombre de la tabla intermedia
        foreignKey: 'OrderId',    // Clave foránea en la tabla intermedia
        otherKey: 'ProductId',   // Clave foránea en la tabla intermedia
        as: 'products'           // Alias para la relación
      });
    }
  }
  Order.init({
    name: DataTypes.STRING,
    fecha: DataTypes.DATE,
    
    userId: {  // Aquí agregamos el userId que hace referencia al usuario
      type: DataTypes.INTEGER,
      allowNull: false,  // No puede ser null, un pedido debe tener un usuario
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};