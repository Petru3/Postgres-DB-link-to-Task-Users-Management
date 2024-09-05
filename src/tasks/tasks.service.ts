// src/tasks/tasks.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskRepository } from './task.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly taskRepo: TaskRepository,
  ) {}

  async getTasks(
    filterDto: GetTasksFilterDto,
    user: User
    ): Promise<Task[]> {
    return this.taskRepo.getTasks(filterDto, user);
  }

  async getTaskById(
    id: number,
    user: User
  ): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id, userId: user.id } });

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return task;
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    user: User
  ): Promise<Task> {
    return this.taskRepo.createTask(createTaskDto, user);
  }

  async deleteTask(
    id: number,
    user: User
  ): Promise<void> {
    const result = await this.taskRepo.deleteTask(id, user);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found for deletion`);
    }
  }

  async updateTaskStatus(id: number, status: TaskStatus, user: User): Promise<Task> {
    const task = await this.getTaskById(id, user);
    return this.taskRepo.updateTaskStatus(id, status);
  }
}
