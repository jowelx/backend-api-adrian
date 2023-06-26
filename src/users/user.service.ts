/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(
    name: string,
    isActive: boolean,
    password: string,
    course: string,
    email: string,
    type: string,
  ): Promise<User> {
    const newUser = new this.userModel({
      name,
      email,
      isActive,
      password,
      course,
      type,
    });
    return newUser.save();
  }

  async updateUser(
    id: string,
    name: string,
    isActive: boolean,
    course: string,
    email: string,
  ): Promise<User> {
    return this.userModel.findByIdAndUpdate(
      id,
      { name, isActive, course, email },
      { new: true },
    );
  }

  async deleteUser(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id);
  }

  async getUserById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find();
  }
  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  private async findUserById(userId: string): Promise<User | string> {
    let user;
    try {
      user = await this.userModel.findById(userId);
    } catch (error) {
      return 'Usuario no encontrado';
    }
    if (!user) {
      return 'Usuario no encontrado';
    }
    return user;
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
  async generateAccessToken(user: User): Promise<string> {
    const payload = { username: user.name, sub: user._id };
    return this.jwtService.sign(payload);
  }
}
