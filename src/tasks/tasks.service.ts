import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private taskModel: Model<Task>) {}

  async getAllTasks(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async getTaskById(id: string): Promise<Task> {
    return this.taskModel.findById(id).exec();
  }

  async createTask(
    title: string,
    description: string,
    completed: boolean,
    student: string,
    date: string,
    id_student: string,
    fileUrl: any,
  ): Promise<Task> {
    const task = new this.taskModel({
      title,
      description,
      completed,
      student,
      date,
      id_student,
      file: fileUrl,
    });
    return task.save();
  }

  async updateTask(
    id: string,
    completed: boolean,
    date: string,
  ): Promise<Task> {
    const actualTask: any = await this.taskModel.findById(id);
    const completedResult = !completed ? actualTask._completed : completed;
    return this.taskModel
      .findByIdAndUpdate(
        id,
        { completed: completedResult, date },
        { new: true },
      )
      .exec();
  }

  async deleteTask(id: string): Promise<void> {
    await this.taskModel.findByIdAndRemove(id).exec();
  }
}
