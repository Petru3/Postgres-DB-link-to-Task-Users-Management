import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';
export declare class Task {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    user: User;
    userId: number;
}
