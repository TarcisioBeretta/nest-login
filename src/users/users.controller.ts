import { Body, Controller, Param, Post } from '@nestjs/common';
import { Delete, Get, Put } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { User } from './schema/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @Get()
    async getAll(): Promise<User[]> {
        return await this.usersService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<User> {
        return await this.usersService.getById(id);
    }

    @Post()
    async create(@Body() users: User): Promise<User> {
        return await this.usersService.create(users);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() user: User): Promise<User> {
        return await this.usersService.update(id, user);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        return await this.usersService.delete(id);
    }
}
