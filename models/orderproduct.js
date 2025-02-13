"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class OrderProduct extends Model {}

  OrderProduct.init(
    {
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "OrderProduct",
      timestamps: false, // No necesita createdAt y updatedAt
    }
  );

  return OrderProduct;
};
 