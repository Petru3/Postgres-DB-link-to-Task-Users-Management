import { PipeTransform } from "@nestjs/common";
import { ProjectStatus } from "../project.status.enum";
export declare class ProjectStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses: ProjectStatus[];
    transform(value: any): any;
    private isStatusValid;
}
