import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Task } from '../tasks/task.entity';
import { User } from 'src/auth/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',               // Database type
  host: 'localhost',              // Database host
  port: 5432,                     // Database port
  username: 'postgres',           // Database username
  password: '1234',               // Database password
  database: 'taskmanagement',     // Database name
  entities: [Task, User],               // Entities to be loaded by TypeORM
  synchronize: true,              // Automatically synchronize the database schema with entities
};
