import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiQuery } from '@nestjs/swagger';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

@SkipThrottle() // Skip Throttler will skip everything for this class
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @SkipThrottle({default: false}) // Skip Throttler will restrict it as normal 
    @Get() // GET
    @UsePipes(new ValidationPipe())
    @ApiQuery({ name: 'role', required: false, enum: ["INTERN", "ENGINEER", "ADMIN"] })
    async findAll(@Query("role") role?: "INTERN" | "ENGINEER" | "ADMIN"): Promise<User[]>{
        return this.usersService.findAllUser(role);
    }

    // @Throttle({default: {ttl: 1000, limit: 2}}) // can overwrite the default limits as well
    @Throttle({short: {ttl: 1000, limit: 2}, long: {ttl: 60000, limit: 100}}) //Override the limits
    @Get(':id') // GET /users/:id
    @UsePipes(new ValidationPipe())
    async findOne(@Param("id") id: string): Promise<User>{
        return this.usersService.findUserById(id);
    }

    @Post() //POST /users
    @UsePipes(new ValidationPipe())
    async create(@Body() user: CreateUserDto): Promise<User> {
        return this.usersService.createUser(user);
    }

    @Patch(':id') //PATCH /users/:id
    @UsePipes(new ValidationPipe())
    async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.usersService.updateUserById(id, updateUserDto);
    }

    @Delete(':id') // DELETE /users/:id
    @UsePipes(new ValidationPipe())
    async delete(@Param("id") id: string): Promise<User> {
        return this.usersService.deleteUserById(id);
    }
}
