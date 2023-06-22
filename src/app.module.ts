import { Module } from '@nestjs/common';
import { TaskModule } from './tasks/tasks.module';
import { UserModule } from './users/user.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    TaskModule,
    UserModule,
    MongooseModule.forRoot(
      'mongodb+srv://Overfox:Jowel04263732404@cluster0.r2xdmpq.mongodb.net/backend_tareas?retryWrites=true&w=majority',
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
