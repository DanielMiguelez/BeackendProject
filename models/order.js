"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      // Un pedido pertenece a un usuario
      Order.belongsTo(models.User, { foreignKey: "userId", as: "user" });

      // Un pedido puede tener muchos productos (relación muchos a muchos)
      Order.belongsToMany(models.Product, {
        through: "OrderProduct", // Nombre de la tabla intermedia
        foreignKey: "orderId",
        otherKey: "productId",
        as: "products",
      });
    }
  }

  Order.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "completed", "canceled"),
        allowNull: false,
        defaultValue: "pending",
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );

  return Order;
};
