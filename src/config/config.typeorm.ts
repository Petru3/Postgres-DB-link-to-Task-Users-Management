import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Task } from '../tasks/task.entity';
import { User } from 'src/auth/user.entity';

import * as config from 'config';

const dbConfig = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,               // Database type
  host: process.env.RDS_HOSTNAME || dbConfig.host,              // Database host
  port: process.env.RDS_PORT || dbConfig.port,                     // Database port
  username: process.env.RDS_USERNAME || dbConfig.username,           // Database username
  password: process.env.RDS_PASSWORD ||  dbConfig.password,               // Database password
  database: process.env.RDS_DB_NAME || dbConfig.database,     // Database name
  entities: [Task, User],               // Entities to be loaded by TypeORM
  synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,              // Automatically synchronize the database schema with entities
};
