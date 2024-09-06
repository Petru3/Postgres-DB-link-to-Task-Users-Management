import { PartialType } from "@nestjs/mapped-types";
import { CreateProjectDto } from "./create-project.dto";
import { ProjectStatus } from "../project.status.enum";
import { IsEnum, IsOptional } from "class-validator";

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
    @IsOptional()
    @IsEnum(ProjectStatus)
    status?: ProjectStatus;
}
