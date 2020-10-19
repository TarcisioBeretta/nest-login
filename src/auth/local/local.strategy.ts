import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {

    constructor(private userService: UsersService) {

        super({
            usernameField: 'email',
            passwordField: 'password'
        });
    }

    async validate(email: string, password: string): Promise<any> {

        const user = await this.userService.getByEmail(email);

        if (!user || user.password !== password) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
