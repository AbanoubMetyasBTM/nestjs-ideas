import "dotenv/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const ORMConfig: TypeOrmModuleOptions = {
  name: "default",
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  dropSchema: false,
  logging: true,
  logger: "file",
  entities: ["src/**/*.entity.ts", "dist/**/*.entity.js"],
  migrations: ["src/**/migrations/*.js", "dist/**/migrations/*.js"],
  migrationsTableName: "migrations"
};

module.exports = {
  "ORMConfig": ORMConfig
};