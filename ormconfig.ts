import 'dotenv/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const ORMConfig: TypeOrmModuleOptions = {
  name: 'default',
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  dropSchema: false,
  logging: false,
  entities: ['src/**/*.entity.ts', 'dist/**/*.entity.js'],
};

module.exports = {
  'ORMConfig': ORMConfig
};