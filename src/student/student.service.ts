import { Injectable } from '@nestjs/common';
import { students } from '../db';
import { v4 as uuid } from 'uuid';
import { FindStudentDto } from "./dto/findStudent.dto";
import { CreateStudentDto } from "./dto/createStudent.dto";
import { UpdateStudentDto } from "./dto/updateStudent.dto";
import { StudentResponseDto } from "./dto/studentResponseDto.dto";
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class StudentService {

    constructor(private httpService: HttpService) {}
    
    private students = students

    getStudents(): FindStudentDto[] {
        return this.students;
    }

    getStudentById(id: string): FindStudentDto {
        return this.students.find((student) => {
            return student.id === id;
        });
    }

    createStudent(payload: CreateStudentDto): StudentResponseDto {
        let newStudent = {
            id: uuid(),
            ...payload
        };

        this.students.push(newStudent);

        return newStudent;
    }

    updateStudent(id: string, payload: UpdateStudentDto) {
        let updateStudent: StudentResponseDto;
        
        const updateStudentList = this.students.map((student) => {
            if (student.id === id) {
                updateStudent = {
                    id: id,
                    ...payload
                }
            } else {
                return student;
            }
        });

        this.students = updateStudentList;

        return updateStudent;
    }

    getAddress(): Observable<AxiosResponse<any>> {
        return this.httpService.get('https://dvhcvn-git-feat-api-daohoangson.vercel.app/api/');
    }

}

