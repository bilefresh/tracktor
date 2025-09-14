import { DataTypes } from "sequelize";
import type { Migration } from "../index.js";

export const up: Migration = async ({ context: queryInterface }) => {
  const transaction = await queryInterface.sequelize.transaction();

  try {
    // Add rider_id column to vehicles table
    await queryInterface.addColumn(
      "vehicles",
      "rider_id",
      {
        type: DataTypes.STRING,
        allowNull: true,
      },
      { transaction }
    );

    // Make model column nullable
    await queryInterface.changeColumn(
      "vehicles",
      "model",
      {
        type: DataTypes.STRING,
        allowNull: true,
      },
      { transaction }
    );

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const down: Migration = async ({ context: queryInterface }) => {
  const transaction = await queryInterface.sequelize.transaction();

  try {
    await queryInterface.removeColumn("vehicles", "rider_id", { transaction });
    
    // Revert model column to not nullable
    await queryInterface.changeColumn(
      "vehicles",
      "model",
      {
        type: DataTypes.STRING,
        allowNull: false,
      },
      { transaction }
    );

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

