import { Controller, Get, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { User } from 'src/users/schema/user.schema';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('login')
    @UseGuards(AuthGuard('local'))
    async localAuth(@Req() request: Request): Promise<any> {
        return this.authService.login(request.user as User);
    }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(): Promise<HttpStatus> {
        return HttpStatus.OK;
    }

    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() request: Request): Promise<any> {
        return this.authService.login(request.user as User);
    }

    @Get('facebook')
    @UseGuards(AuthGuard('facebook'))
    async facebookAuth(): Promise<HttpStatus> {
        return HttpStatus.OK;
    }

    @Get('facebook/redirect')
    @UseGuards(AuthGuard('facebook'))
    async facebookAuthRedirect(@Req() request: Request): Promise<any> {
        return this.authService.login(request.user as User);
    }
}
