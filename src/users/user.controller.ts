/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from './user.model';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User | any> {
    if (!id) {
      return {
        statusCode: 400,
        message: 'Se debe proporcionar id valido',
      };
    }
    return this.usersService.getUserById(id);
  }

  @Post()
  async createUser(@Body() userData: User): Promise<User | any> {
    const { name, isActive, password, course, email, type } = userData;

    if (!name || !isActive || !password || !email || !type || !course) {
      return {
        statusCode: 400,
        message: 'Se debe proporcionar todos los datos',
      };
    }

    return this.usersService.createUser(
      name,
      isActive,
      password,
      course,
      email,
      type,
    );
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() userData: User,
  ): Promise<User | any> {
    const { name, isActive, course, email } = userData;

    if (!id) {
      return {
        statusCode: 400,
        message: 'Se debe proporcionar id valido',
      };
    }

    if (!name || !isActive) {
      return {
        statusCode: 400,
        message: 'Se debe proporcionar todos los datos',
      };
    }

    return this.usersService.updateUser(id, name, isActive, course, email);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void | any> {
    if (!id) {
      return {
        statusCode: 400,
        message: 'Se debe proporcionar id valido',
      };
    }
    await this.usersService.deleteUser(id);
  }
  @Post('login')
  async login(
    @Body() loginData: { email: string; password: string },
  ): Promise<{ accessToken: string } | any> {
    const { email, password } = loginData;

    if (!email || !password) {
      return 'se requieren contraseña y correo';
    }

    const user = await this.usersService.getUserByEmail(email);

    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.UNAUTHORIZED);
    }

    const passwordMatch = await this.usersService.comparePasswords(
      password,
      user.password,
    );

    if (!passwordMatch) {
      return 'las contraseñas no coinciden';
    }

    // Generar y devolver un token de acceso (aquí debes implementar tu lógica de autenticación/autorización)
    const accessToken = await this.usersService.generateAccessToken(user);

    return { accessToken, user };
  }
}
