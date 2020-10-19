import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { User } from 'src/users/schema/user.schema';

@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService) { }

    async login(user: User): Promise<any> {
        return {
            access_token: this.jwtService.sign({
                id: user._id,
                email: user.email,
                name: `${user.firstName} ${user.lastName}`
            })
        }
    }
}
