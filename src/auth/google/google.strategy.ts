import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { googleConstants } from 'src/constants';
import { User } from 'src/users/schema/user.schema';
import { GoogleService } from './google.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

    constructor(private googleService: GoogleService) {

        super({
            clientID: googleConstants.clientId,
            clientSecret: googleConstants.clientSecret,
            callbackURL: 'http://localhost:3000/auth/google/redirect',
            scope: ['email', 'profile'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile): Promise<any> {
        const user = this.profileToUser(profile);
        return await this.googleService.findOrCreateUser(user);
    }

    private profileToUser(profile: Profile): User {
        return {
            email: profile.emails[0].value,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            google: {
                id: profile.id,
                picture: profile.photos[0].value,
            }
        } as User
    }
}
