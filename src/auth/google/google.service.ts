import { Injectable } from '@nestjs/common';
import { User } from 'src/users/schema/user.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class GoogleService {

    constructor(private usersService: UsersService) { }

    async findOrCreateUser(user: User): Promise<User> {
        return (
            await this.findUser(user) ||
            await this.createUser(user)
        );
    }

    private async findUser(user: User): Promise<User> {
        return await this.usersService.getByGoogleId(user.google.id);
    }

    private async createUser(user: User): Promise<User> {
        return await this.usersService.create(user);
    }
}
