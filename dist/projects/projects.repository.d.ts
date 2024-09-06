import { DataSource, Repository } from "typeorm";
import { Project } from "./project.entity";
import { getProjectFilterDto } from "./dto/filter-projects.dto";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
export declare class ProjectsRepository extends Repository<Project> {
    private readonly dataSource;
    private readonly logger;
    constructor(dataSource: DataSource);
    getProjects(filterDto: getProjectFilterDto): Promise<Project[]>;
    createProject(createProjectDto: CreateProjectDto): Promise<Project>;
    updateProjectById(id: number, updateProjectDto: UpdateProjectDto): Promise<Project>;
    deleteProjectById(id: number): Promise<void>;
}
