import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ProjectStatus } from "./project.status.enum";

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({
        type: 'enum',
        enum: ProjectStatus,
        default: ProjectStatus.PENDING
    })
    status: ProjectStatus
}