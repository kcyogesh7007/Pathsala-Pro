import { Sequelize } from "sequelize-typescript";
import { config } from "dotenv";
config();

const DB_NAME = process.env.DB_NAME;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;

if (
  DB_NAME === undefined ||
  DB_USERNAME === undefined ||
  DB_PASSWORD === undefined ||
  DB_HOST === undefined ||
  DB_PORT === undefined
) {
  throw new Error("Missing database environment variables");
}

const sequelize = new Sequelize({
  database: DB_NAME,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  dialect: "mysql",
  port: Number(DB_PORT),
  models: [__dirname + "/models"],

  host: DB_HOST,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");
  } catch (error: any) {
    console.log(error);
    process.exit(1);
  }
};

sequelize.sync({ alter: false }).then(() => {
  console.log("migrated successfully");
});
export { sequelize, connectDB };
