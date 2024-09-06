import { DataSource, Repository } from "typeorm";
import { Project } from "./project.entity";
import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { getProjectFilterDto } from "./dto/filter-projects.dto";
import { CreateProjectDto } from "./dto/create-project.dto";
import { ProjectStatus } from "./project.status.enum";
import { UpdateProjectDto } from "./dto/update-project.dto";

@Injectable()
export class ProjectsRepository extends Repository<Project> {
    private readonly logger = new Logger('ProjectsRepository');

    constructor(private readonly dataSource: DataSource) {
        super(Project, dataSource.createEntityManager());
    }

    async getProjects(
        filterDto: getProjectFilterDto
    ): Promise<Project[]> {
        const { status, search } = filterDto;

        const query = this.createQueryBuilder('project'); // Correct table alias

        if (status) {
            query.andWhere('project.status = :status', { status });
        }
        if (search) {
            query.andWhere('(project.title LIKE :search OR project.description LIKE :search)', { search: `%${search}%` });
        }

        try {
            return await query.getMany();
        } catch (error) {
            this.logger.error(`Failed to get projects for filter: ${JSON.stringify(filterDto)}`, error.stack);
            throw new InternalServerErrorException();
        }
    }

    async createProject(
        createProjectDto: CreateProjectDto
    ): Promise<Project> {
        const { title, description } = createProjectDto;

        const project = this.create({
            title,
            description,
            status: ProjectStatus.PENDING
        });

        try {
            return await this.save(project);
        } catch (error) {
            this.logger.error(`Failed to create project`, error.stack);
            throw new InternalServerErrorException();
        }
    }

    async updateProjectById(
        id: number,
        updateProjectDto: UpdateProjectDto
    ): Promise<Project> {
        const currentProject = await this.findOne({ where: { id } });

        if (!currentProject) {
            throw new Error(`Project with ID "${id}" not found`);
        }

        const updatedProject = this.merge(currentProject, updateProjectDto);

        try {
            return await this.save(updatedProject);
        } catch (error) {
            this.logger.error(`Failed to update project with ID "${id}"`, error.stack);
            throw new InternalServerErrorException();
        }
    }

    async deleteProjectById(
        id: number
    ): Promise<void> {
        this.delete({id})
    }
}
