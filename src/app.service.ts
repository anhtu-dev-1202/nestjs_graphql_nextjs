import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactInfo } from './entity/contact-info.entity';
import { Employee } from './entity/employee.entity';
import { Meeting } from './entity/meeting.entity';
import { Task } from './entity/task.entity';
import { User } from './entity/users.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private usersRespository: Repository<User>,
    @InjectRepository(Employee) private employeeRepo: Repository<Employee>,
    @InjectRepository(ContactInfo) private contactInfoRepo: Repository<ContactInfo>,
    @InjectRepository(Meeting) private meetingRepo: Repository<Meeting>,
    @InjectRepository(Task) private taskRepo: Repository<Task>,
    ) {}

  getAll(): Promise<User[]> {
    return this.usersRespository.find(
      {
        relations: ['pets']
      }
    );
  }

  async getOneById(id: number): Promise<User> {
    try {
      const user = await this.usersRespository.findOneOrFail(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  createUser(name: string): Promise<User> {
    const newUser = this.usersRespository.create({ name });
    return this.usersRespository.save(newUser);
  }

  async updateUser(id: number, name: string): Promise<User> {
    const user = await this.getOneById(id);
    user.name = name;
    return this.usersRespository.save(user);
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.getOneById(id);
    return this.usersRespository.remove(user);
  }

  // customAny():any {
  //   return this.usersRespository.createQueryBuilder("user").select("name");
  // }

  getHello(): string {
    return 'Hello World!';
  }


  //test khác

  async seed() {

    //Employee 1 CEO
    const ceo = this.employeeRepo.create({ name: 'Mr. CEO' });
    await this.employeeRepo.save(ceo);

    const ceoContactInfo = this.contactInfoRepo.create({
       email: 'email@gmail.com', 
      //  employeeId: ceo.id,
      });

    ceoContactInfo.employee = ceo;
    await this.contactInfoRepo.save(ceoContactInfo);

    //Employee 2 Manager(me)
    const manager = this.employeeRepo.create({
      name: 'Marius',
      manager: ceo,
    });

    const task1 = this.taskRepo.create({ name: 'Hire people' });
    await this.taskRepo.save(task1);

    const task2= this.taskRepo.create({ name: 'Present to CEO' });
    await this.taskRepo.save(task2);

    manager.tasks = [task1, task2];

    const meeting1 = this.meetingRepo.create({ zoomUrl: 'meeting.com' });
    meeting1.attendees = [ceo];
    await this.meetingRepo.save(meeting1);

    manager.meetings = [meeting1];

    // const meeting2 = this.meetingRepo.create({ zoomUrl: 'Present to CEO' });
    // meeting2.attendees = [ceo];
    // await this.meetingRepo.save(meeting2);

    await this.employeeRepo.save(manager);

  }

  getEmployeeById(id: number) {
    // return this.employeeRepo.findOne(id, {
    //   relations: ['manager', 'directReports', 'tasks', 'contactInfo', 'meetings']
    // })

    return this.employeeRepo.createQueryBuilder('employee').
      leftJoinAndSelect('employee.directReports', 'directReports').
      leftJoinAndSelect('employee.meetings', 'meetings').
      leftJoinAndSelect('employee.tasks', 'tasks').
      where('employee.id = :employeeId', {employeeId: id}).
      getOne();
  }

  deleteEmployee(id: number) {
    return this.employeeRepo.delete(id);
  }

}
