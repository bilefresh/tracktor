import { DataTypes } from "sequelize";
import type { Migration } from "../index.js";

export const up: Migration = async ({ context: queryInterface }) => {
  const transaction = await queryInterface.sequelize.transaction();

  try {
    // Add vehicle_type column to vehicles table
    await queryInterface.addColumn(
      "vehicles",
      "vehicle_type",
      {
        type: DataTypes.ENUM("car", "motorcycle", "truck"),
        allowNull: false,
        defaultValue: "car",
      },
      { transaction }
    );

    // Add brand column to vehicles table
    await queryInterface.addColumn(
      "vehicles",
      "brand",
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
    await queryInterface.removeColumn("vehicles", "vehicle_type", { transaction });
    await queryInterface.removeColumn("vehicles", "brand", { transaction });

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
