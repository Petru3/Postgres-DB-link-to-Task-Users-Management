import { ProjectsService } from './projects.service';
import { getProjectFilterDto } from './dto/filter-projects.dto';
import { Project } from './project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    getProjects(filterDto: getProjectFilterDto): Promise<Project[]>;
    getProjectById(id: number): Promise<Project>;
    createProject(createProjectDto: CreateProjectDto): Promise<Project>;
    updateProjectById(id: number, status: string, updateProjectDto: UpdateProjectDto): Promise<Project>;
    deleteProjectById(id: number): Promise<void>;
}
