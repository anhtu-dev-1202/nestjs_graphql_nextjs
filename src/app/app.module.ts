import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { AuthModule } from '../auth/auth.module';
import { StudentModule } from '../student/student.module'
import config from '../../ormconfig';
import { User } from '../entity/users.entity';
import { Employee } from '../entity/employee.entity';
import { ContactInfo } from '../entity/contact-info.entity';
import { Meeting } from '../entity/meeting.entity';
import { Task } from '../entity/task.entity';
import { ChatGateway } from '../websocket/chat.gateway';

@Module({
  imports: [StudentModule, AuthModule, TypeOrmModule.forRoot(config), TypeOrmModule.forFeature([User, Employee, ContactInfo, Meeting, Task])],
  providers: [AppService, ChatGateway],
  controllers: [AppController]
})
export class AppModule {}
