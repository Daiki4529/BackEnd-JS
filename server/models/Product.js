const { Model, DataTypes } = require("sequelize");
const connection = require("./db");

class Product extends Model {}

Product.init(
  {
    // - un nom (name)
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    //  - une description (description) min 50 caractères
    description: {
      type: DataTypes.STRING,
      validate: {
        len: [50],
      },
    },
    //  - un prix (unit_price) > 0
    unit_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isGreaterThanZero(value) {
          if (parseInt(value) <= 0) {
            throw new Error(
              "Only values greater than zero are allowed ! (No free products for you hehe)"
            );
          }
        },
      },
    },
    //  - une quantité en stock (stock_quantity) > 0
    stock_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isGreaterThanZero(value) {
          if (parseInt(value) <= 0) {
            throw new Error("Only values greater than zero are allowed !");
          }
        },
      },
    },
    // - une catégorie (category) compris entre ['alimentation', 'hygiène', 'entretien', 'autre']
    category: {
      type: DataTypes.ENUM,
      values: ["alimentation", "hygiène", "entretien", "autre"],
    },
  },
  {
    sequelize: connection,
  }
);

module.exports = Product;
