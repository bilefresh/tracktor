import { DataTypes, Model, Optional } from "sequelize";
import { db } from "@db/index.js";
import FuelLog from "./FuelLog.js";
import { VehicleError } from "@exceptions/VehicleError.js";
import { Status } from "@exceptions/ServiceError.js";

interface VehicleAttributes {
  id: string;
  vehicleType: "car" | "motorcycle" | "truck";
  brand?: string;
  make: string;
  model?: string;
  year: number;
  licensePlate: string;
  vin?: string;
  color?: string;
  odometer?: number;
  riderId?: string;
}

interface VehicleCreationAttributes extends Optional<VehicleAttributes, "id"> {}

class Vehicle
  extends Model<VehicleAttributes, VehicleCreationAttributes>
  implements VehicleAttributes
{
  declare public id: string;
  declare public vehicleType: "car" | "motorcycle" | "truck";
  declare public brand?: string;
  declare public make: string;
  declare public model?: string;
  declare public year: number;
  declare public licensePlate: string;
  declare public vin?: string;
  declare public color?: string;
  declare public odometer?: number;
  declare public riderId?: string;
}

Vehicle.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    vehicleType: {
      type: DataTypes.ENUM("car", "motorcycle", "truck"),
      allowNull: false,
      defaultValue: "car",
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    make: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 50],
          msg: "Manufacturer must be between length 3 to 50.",
        },
      },
    },
    model: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [3, 50],
          msg: "Model must be between length 3 to 50.",
        },
      },
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: {
          args: [1886],
          msg: "Year should be grater than 1886(when first car was invented).",
        },
        max: {
          args: [new Date().getFullYear()],
          msg: "Year should be less than current year.",
        },
      },
    },
    licensePlate: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    vin: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: {
          msg: "VIN number can't be an empty string.",
        },
        is: {
          args: "^[A-HJ-NPR-Z0-9]{3,}$",
          msg: "VIN number format is incorrect.",
        },
        async isUnique(value: string) {
          if (!value) return;
          const existingVehicles = await db
            .getQueryInterface()
            .select(null, "vehicles", {
              where: {
                vin: value,
              },
            });
          if (existingVehicles.length > 0) {
            throw new VehicleError(
              "VIN NUmber already exists.",
              Status.CONFLICT,
            );
          }
        },
      },
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    odometer: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: true,
        async validateOdometer(value: number) {
          const minOdometer: number = await FuelLog.min("odometer", {
            where: {
              vehicleId: this.id as string,
            },
          });

          if (minOdometer && value > minOdometer) {
            throw new VehicleError(
              "Initial Odometer Reading must be lesser than first fuel log odometer.",
              Status.BAD_REQUEST,
            );
          }
        },
      },
    },
    riderId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "vehicles",
    timestamps: true,
    underscored: true,
    sequelize: db,
  },
);

export default Vehicle;
