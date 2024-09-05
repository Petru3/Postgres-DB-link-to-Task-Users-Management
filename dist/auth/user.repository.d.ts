import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
export declare class UserRepository extends Repository<User> {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    ValidateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string>;
    private hashPassword;
}
