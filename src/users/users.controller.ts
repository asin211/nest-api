import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Get() // GET
    @UsePipes(new ValidationPipe())
    async findAllUsers(): Promise<User[]>{
        return this.usersService.findAllUser();
    }

    @Get(':id') // GET /users/:id
    @UsePipes(new ValidationPipe())
    async findUser(@Param("id") id: string): Promise<User>{
        return this.usersService.findUserById(id);
    }

    @Post() //POST /users
    @UsePipes(new ValidationPipe())
    async createUser(@Body() user: CreateUserDto): Promise<User> {
        return this.usersService.createUser(user);
    }

    @Patch(':id') //PATCH /users/:id
    @UsePipes(new ValidationPipe())
    async updateUser(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.usersService.updateUserById(id, updateUserDto);
    }

    @Delete(':id') // DELETE /users/:id
    @UsePipes(new ValidationPipe())
    async deleteUser(@Param("id") id: string): Promise<User> {
        return this.usersService.deleteUserById(id);
    }
}
