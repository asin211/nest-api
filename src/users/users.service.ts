import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../models/user.model';

@Injectable()
export class UsersService {
    
    constructor(
        @InjectModel(User.name)
        private users: mongoose.Model<User>
    ) {}

    async findAllUser(role?: "INTERN" | "ENGINEER" | "ADMIN"): Promise<User[]> {
        const filter = role ? { role } : {};
        if (role && !["INTERN", "ENGINEER", "ADMIN"].includes(role)) {
            throw new HttpException('Invalid Role!', HttpStatus.BAD_REQUEST);
        }  
        
        const users = await this.users.find(filter); 
        if (!users) {
            throw new NotFoundException("No User not found!");
        }
        return users;
    }

    async findUserById(id: string): Promise<User> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new HttpException('Invalid ID!', HttpStatus.BAD_REQUEST);
        }
        const user = await this.users.findById(id);
        if (!user) {
            throw new NotFoundException("No user found!");
        }
        return user;
    }  

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const existingUser = await this.users.findOne({ email: createUserDto.email });
        if (existingUser) {
            throw new HttpException('Email already registered', HttpStatus.BAD_REQUEST);
        }
        const newUser = new this.users(createUserDto);
        await newUser.save();
        return newUser;
    }

    async updateUserById(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new HttpException('Invalid ID!', HttpStatus.BAD_REQUEST);
        }
        const updatedUser = await this.users.findByIdAndUpdate(id, updateUserDto, {
            new: true,
            runValidators: true,
        });
        if (!updatedUser) {
            throw new NotFoundException("No user found!");
        }
        return updatedUser;
    }

    async deleteUserById(id: string): Promise<User> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new HttpException('Invalid ID!', HttpStatus.BAD_REQUEST);
        }
        const user = await this.users.findByIdAndDelete(id);
        if (!user) {
            throw new NotFoundException("No user found!");
        }
        return user;
    }
}