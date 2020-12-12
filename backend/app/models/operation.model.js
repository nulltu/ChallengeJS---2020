module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = require("sequelize");
  const Operation = sequelize.define("operation", {
    concept: {
      type: Sequelize.STRING
    },
    amount: {
      type: DataTypes.DECIMAL(10,2)
    },

    type_operation: {
      type: Sequelize.STRING
    }
  });

  return Operation;
};
