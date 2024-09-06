import { BadRequestException, PipeTransform } from "@nestjs/common";
import { ProjectStatus } from "../project.status.enum";

export class ProjectStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        ProjectStatus.DONE,
        ProjectStatus.PENDING
    ];

    transform(value: any) {
        value = value.toUpperCase();

        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`"${value}" is an invalid status!`);
        }

        return value;
    }

    private isStatusValid(status: string) {
        return this.allowedStatuses.includes(status as ProjectStatus);
    }
}
