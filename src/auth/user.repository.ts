import { Auth, DataSource, Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { User } from "./user.entity";
import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private readonly dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        let { username, password } = authCredentialsDto;

        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);

        try {
            await this.save(user);
        } catch (error) {
            if (error.code === '23505') { // duplicate username
                throw new ConflictException('Username already exists!');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async ValidateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const { username, password } = authCredentialsDto;
        const user = await this.findOne({ where: { username } });

        if (user && await user.validatePassword(password)) {
            return user.username;
        } else {
            return null;
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}
