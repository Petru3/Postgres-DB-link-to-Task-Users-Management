import { Repository, DataSource, DeleteResult } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from 'src/auth/user.entity';
export declare class TaskRepository extends Repository<Task> {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    private logger;
    getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]>;
    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task>;
    deleteTask(id: number, user: User): Promise<DeleteResult>;
    updateTaskStatus(id: number, status: TaskStatus): Promise<Task>;
}
