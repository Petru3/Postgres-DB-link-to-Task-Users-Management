"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectStatusValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const project_status_enum_1 = require("../project.status.enum");
class ProjectStatusValidationPipe {
    constructor() {
        this.allowedStatuses = [
            project_status_enum_1.ProjectStatus.DONE,
            project_status_enum_1.ProjectStatus.PENDING
        ];
    }
    transform(value) {
        value = value.toUpperCase();
        if (!this.isStatusValid(value)) {
            throw new common_1.BadRequestException(`"${value}" is an invalid status!`);
        }
        return value;
    }
    isStatusValid(status) {
        return this.allowedStatuses.includes(status);
    }
}
exports.ProjectStatusValidationPipe = ProjectStatusValidationPipe;
//# sourceMappingURL=project-status-validation.pipe.js.map