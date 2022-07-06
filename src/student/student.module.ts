import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { StudentController } from './student.controller'
import { StudentService } from './student.service'
import { ValidStudentMiddleware } from '../common/middleware/validStudent.middleware'
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule],
    controllers: [StudentController],
    providers: [StudentService]
})
export class StudentModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
        .apply(ValidStudentMiddleware)
        .forRoutes({ path: 'students/:id', method: RequestMethod.GET });
        consumer
        .apply(ValidStudentMiddleware)
        .forRoutes({ path: 'students/:id', method: RequestMethod.PATCH });
    }
}
