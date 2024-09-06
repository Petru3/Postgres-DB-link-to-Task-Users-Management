import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { ProjectStatus } from "../project.status.enum";


export class getProjectFilterDto { 
    @IsOptional()
    @IsIn(
        [
            ProjectStatus.PENDING,
            ProjectStatus.DONE
        ]
    )
    status: ProjectStatus

    @IsOptional()
    @IsNotEmpty()
    search: string;
}