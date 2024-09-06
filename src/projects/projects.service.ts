import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { getProjectFilterDto } from './dto/filter-projects.dto';
import { Project } from './project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectsRepository } from './projects.repository';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private readonly projectsRepository: Repository<Project>,
        private readonly projectsRepo: ProjectsRepository
    ) {}

    async getProjects(
        filterDto: getProjectFilterDto
    ): Promise<Project[]> {
        return this.projectsRepo.getProjects(filterDto);
    }

    async getProjectById(id: number): Promise<Project> {
        const project = await this.projectsRepository.findOne({ where: { id } });

        if (!project) {
            throw new NotFoundException(`Project with ID "${id}" not found`);
        }

        return project;
    }

    async createProject(
        createProjectDto: CreateProjectDto
    ): Promise<Project> {
        return this.projectsRepo.createProject(createProjectDto);
    }

    async updateProjectById(
        id: number,
        updateProjectDto: UpdateProjectDto
    ): Promise<Project> {
        const project = await this.getProjectById(id);
        return this.projectsRepo.updateProjectById(id, updateProjectDto);
    }

    async deleteProjectById(
        id: number
    ): Promise<void> {
        return this.projectsRepo.deleteProjectById(id);
    }
}
