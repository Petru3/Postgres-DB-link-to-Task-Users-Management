import { Module } from '@nestjs/common';
import { ProjectsModule } from './projects/projects.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/config.typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ProjectsModule
  ],
})
export class AppModule {}
