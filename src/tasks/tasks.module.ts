import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task, TaskSchema } from './task.model';
import { MongooseModule } from '@nestjs/mongoose';
import { FileUploadService } from 'src/function/uploadFile.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }])],
  controllers: [TasksController],
  providers: [TasksService, FileUploadService],
})
export class TaskModule {}
