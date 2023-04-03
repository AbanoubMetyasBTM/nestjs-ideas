import "dotenv/config";
import { DataSource } from "typeorm";

export const ORMConfig: DataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  dropSchema: false,
  logging: true,
  migrationsTableName: "migrations",
  migrations: ["src/**/migrations/*.js", "dist/**/migrations/*.js"]
});

module.exports = {
  "ORMConfig": ORMConfig
};