import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';
import { facebookConstants } from 'src/constants';
import { User } from 'src/users/schema/user.schema';
import { FacebookService } from './facebook.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {

    constructor(private facebookService: FacebookService) {

        super({
            clientID: facebookConstants.clientId,
            clientSecret: facebookConstants.clientSecret,
            callbackURL: 'http://localhost:3000/auth/facebook/redirect',
            scope: 'email',
            profileFields: ['emails', 'name', 'picture'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile): Promise<any> {
        const user = this.profileToUser(profile);
        return await this.facebookService.findOrCreateUser(user);
    }

    private profileToUser(profile: Profile): User {
        return {
            email: profile.emails[0].value,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            facebook: {
                id: profile.id,
                picture: profile.photos[0].value,
            }
        } as User
    }

}
