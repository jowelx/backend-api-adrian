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

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

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
    const { title, description, student, id_student, date } = taskData;

    if (!title || !description || !student || !date || !id_student) {
      return {
        statusCode: 400,
        message: 'Faltan datos obligatorios',
      };
    }

    const completed = false;
    return this.tasksService.createTask(
      title,
      description,
      completed,
      student,
      date,
      id_student,
    );
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() taskData: Task,
  ): Promise<Task | any> {
    const { title, description, completed, student, date } = taskData;

    if (!id) {
      return {
        statusCode: 400,
        message: 'Se debe proporcionar un ID válido',
      };
    }

    if (!title || !description || !student || !date) {
      return {
        statusCode: 400,
        message: 'Faltan datos obligatorios',
      };
    }

    return this.tasksService.updateTask(
      id,
      title,
      description,
      completed,
      student,
      date,
    );
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
