// src/tasks/task.repository.ts
import { Repository, DataSource, DeleteResult } from 'typeorm';
import { Task } from './task.entity';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private readonly dataSource: DataSource) {
    super(Task, dataSource.createEntityManager()); // Use EntityManager for custom repository
  }
  private logger = new Logger('TaskRepository')

  async getTasks(
    filterDto: GetTasksFilterDto,
    user: User
  ): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');

    query.where('task.userId = :userId', {userId: user.id});
    
    if(status) {
      query.andWhere('task.status = :status', { status });
    }

    if(search) {
      query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` });
    }

    try{
      const tasks = query.getMany();
      return tasks;
    }catch(error){
      this.logger.error(`Failed to get tasks for user "${user.username}", DTO: ${JSON.stringify(filterDto)}`, error.stack)
      throw new InternalServerErrorException();
    }
    
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    user: User
  ): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;

    task.user = user;

    try{
      await this.save(task);
    }catch(error) {
      this.logger.error(`Failed to create a task for user "${user.username}", Data ${createTaskDto}`, error.stack)
      throw new InternalServerErrorException();
    }

    delete task.user;
    return task;
  }

  async deleteTask(
    id: number,
    user: User
  ): Promise<DeleteResult> {
    return this.delete({id, userId: user.id});
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.findOne({ where: { id } });
    if (!task) {
      throw new Error(`Task with ID "${id}" not found`);
    }
    task.status = status;
    return this.save(task);
  }
}
