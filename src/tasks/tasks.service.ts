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
  ): Promise<Task> {
    const task = new this.taskModel({
      title,
      description,
      completed,
      student,
      date,
      id_student,
    });
    return task.save();
  }

  async updateTask(
    id: string,
    title: string,
    description: string,
    completed: boolean,
    student: string,
    date: string,
  ): Promise<Task> {
    return this.taskModel
      .findByIdAndUpdate(
        id,
        { title, description, completed, student, date },
        { new: true },
      )
      .exec();
  }

  async deleteTask(id: string): Promise<void> {
    await this.taskModel.findByIdAndRemove(id).exec();
  }
}
