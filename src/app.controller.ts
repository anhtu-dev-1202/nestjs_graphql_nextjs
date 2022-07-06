import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
// import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
// import { AuthenticatedGuard } from './auth/authenticated.guard'; Passport
import { LocalAuthGuard } from './auth/local-auth.guard';
// import { User } from './entity/users.entity';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService, private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Get('pro')
  getPro(@Request() req): string {
    return  req.user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): any {
    return this.authService.login(req.user);
  }

  // @Get()
  // async getHello(): Promise<User[]> {
  //   return this.appService.getAll();
  // }

  @Get()
  async getHello(): Promise<any> {
    return this.appService.deleteEmployee(1);
  }

  

}
