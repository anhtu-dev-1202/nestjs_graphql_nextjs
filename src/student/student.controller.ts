import { Controller, Get, Post, Param, Patch, Delete, Body} from "@nestjs/common";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { AxiosResponse } from "axios";
import { Observable } from "rxjs";
import { CreateStudentDto } from "./dto/createStudent.dto";
import { FindStudentDto } from "./dto/findStudent.dto";
import { StudentResponseDto } from "./dto/studentResponseDto.dto";
import { UpdateStudentDto } from "./dto/updateStudent.dto";
import { StudentService } from './student.service';

@ApiTags('students')
@Controller('students')
export class StudentController {

    constructor(private readonly studentService: StudentService) {}

    // @Get()
    // getStudents(): FindStudentDto[] {
    //     return this.studentService.getStudents();
    // }

    // @Get(':id')
    // getStudentById(@Param('id') id: string): FindStudentDto {
    //     console.log('ccđâs')
    //     return this.studentService.getStudentById(id);
    // }

    // @ApiCreatedResponse({type: StudentResponseDto})
    // @Post()
    // createStudent(@Body() body: CreateStudentDto): StudentResponseDto {
    //     return this.studentService.createStudent(body);
    // }

    // @Patch(':id')
    // updateStudent(
    //     @Param('id') id: string,
    //     @Body() body: UpdateStudentDto
    // ): StudentResponseDto {
    //     return this.studentService.updateStudent(id, body);
    // }

    // @Delete(':id')
    // deleteStudent() {
    //     return "Delete Student";
    // }


    @Get()
    getAddress(): Observable<AxiosResponse<any>> {
        return this.studentService.getAddress();
    }
}

