import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { jwtConstants } from 'src/constants';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FacebookService } from './facebook/facebook.service';
import { FacebookStrategy } from './facebook/facebook.strategy';
import { GoogleService } from './google/google.service';
import { GoogleStrategy } from './google/google.strategy';
import { JwtStrategy } from './jwt/jwt.strategy';
import { LocalStrategy } from './local/local.strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    GoogleStrategy,
    GoogleService,
    FacebookStrategy,
    FacebookService,
    JwtStrategy
  ]
})
export class AuthModule { }
