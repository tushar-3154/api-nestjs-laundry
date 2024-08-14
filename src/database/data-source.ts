import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();
const configService = new ConfigService();

const entityPath = __dirname + '/../' + configService.get('ENTITIES') || '';
const migrationPath =
  __dirname + '/../' + configService.get('MIGRATIONS') || '';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: configService.get('DB_HOST'),
  port: Number(configService.get('DB_HOST')),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_DATABASE'),
  entities: [entityPath],
  synchronize: false,
  migrations: [migrationPath],
  logging: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
