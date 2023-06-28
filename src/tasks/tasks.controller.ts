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
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from 'src/function/uploadFile.controller';
import { v2 as cloudinary } from 'cloudinary';

@Controller('tasks')
export class TasksController {
  constructor(
    private tasksService: TasksService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  @Get()
  async getAllTasks(): Promise<Task[]> {
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string): Promise<Task | any> {
    if (!id) {
      return {
        statusCode: 400,
        message: 'Se debe proporcionar un ID válido',
      };
    }
    return this.tasksService.getTaskById(id);
  }

  @Post()
  async createTask(@Body() taskData: Task): Promise<Task | any> {
    const { title, description, student, id_student, date, file } = taskData;
    if (!title || !description || !student || !date || !id_student) {
      return {
        statusCode: 400,
        message: 'Faltan datos obligatorios',
      };
    }
    // Configura las credenciales de Cloudinary
    cloudinary.config({
      cloud_name: '',
      api_key: '',
      api_secret: '',
      secure: true,
      access_mode: 'public',
    });
    const fileContent = file.split(';base64,').pop();

    // Sube el archivo a Cloudinary
    const uploadResult = await cloudinary.uploader.upload(
      `data:;base64,${fileContent}`,
    );

    // Obtiene la URL segura del archivo subido
    const fileUrl = uploadResult.secure_url;
    console.log(fileUrl);
    const completed = false;
    return this.tasksService.createTask(
      title,
      description,
      completed,
      student,
      date,
      id_student,
      fileUrl,
    );
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() taskData: Task,
  ): Promise<Task | any> {
    const { completed, date } = taskData;

    if (!id) {
      return {
        statusCode: 400,
        message: 'Se debe proporcionar un ID válido',
      };
    }

    if (!date) {
      return {
        statusCode: 400,
        message: 'Faltan datos obligatorios',
      };
    }

    return this.tasksService.updateTask(id, completed, date);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<void | any> {
    if (!id) {
      return {
        statusCode: 400,
        message: 'Se debe proporcionar un ID válido',
      };
    }
    return this.tasksService.deleteTask(id);
  }
}
