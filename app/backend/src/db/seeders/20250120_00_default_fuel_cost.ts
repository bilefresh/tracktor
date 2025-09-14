import { DataTypes } from "sequelize";
import type { Seeder } from "../index.js";

export const up: Seeder = async ({ context: queryInterface }) => {
  const transaction = await queryInterface.sequelize.transaction();

  try {
    // Insert default fuel cost configuration
    await queryInterface.bulkInsert(
      "config",
      [
        {
          key: "fuelCost",
          value: "500.00",
          description: "Default fuel cost per liter in Nigerian Naira",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      { 
        transaction,
        ignoreDuplicates: true 
      }
    );

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const down: Seeder = async ({ context: queryInterface }) => {
  const transaction = await queryInterface.sequelize.transaction();

  try {
    await queryInterface.bulkDelete(
      "config",
      {
        key: "fuelCost",
      },
      { transaction }
    );

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
