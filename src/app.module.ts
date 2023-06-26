import { Module } from '@nestjs/common';
import { TaskModule } from './tasks/tasks.module';
import { UserModule } from './users/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [TaskModule, UserModule, MongooseModule.forRoot('')],
  controllers: [],
  providers: [],
})
export class AppModule {}
