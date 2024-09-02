// src/tasks/task.repository.ts
import { Repository, DataSource, DeleteResult } from 'typeorm';
import { Task } from './task.entity';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private readonly dataSource: DataSource) {
    super(Task, dataSource.createEntityManager()); // Use EntityManager for custom repository
  }

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');
    
    if(status) {
      query.andWhere('task.status = :status', { status });
    }

    if(search) {
      query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` });
    }
    const tasks = query.getMany();

    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.create({ title, description });
    return this.save(task);
  }

  async deleteTask(id: number): Promise<DeleteResult> {
    return this.delete(id);
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
