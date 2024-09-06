import { getProjectFilterDto } from './dto/filter-projects.dto';
import { Project } from './project.entity';
import { Repository } from 'typeorm';
import { ProjectsRepository } from './projects.repository';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
export declare class ProjectsService {
    private readonly projectsRepository;
    private readonly projectsRepo;
    constructor(projectsRepository: Repository<Project>, projectsRepo: ProjectsRepository);
    getProjects(filterDto: getProjectFilterDto): Promise<Project[]>;
    getProjectById(id: number): Promise<Project>;
    createProject(createProjectDto: CreateProjectDto): Promise<Project>;
    updateProjectById(id: number, updateProjectDto: UpdateProjectDto): Promise<Project>;
    deleteProjectById(id: number): Promise<void>;
}
