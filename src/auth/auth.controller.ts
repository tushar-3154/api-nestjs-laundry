import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorator/roles.decorator';
import { LoginDto } from 'src/dto/login.dto';
import { Role } from 'src/enum/role.enum';
import { SignupDto } from '../dto/signup.dto';
import { AuthService } from './auth.service';
import { RolesGuard } from './guard/role.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto): Promise<{ token: string }> {
    return this.authService.signup(signupDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }

  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard('jwt'))
  @Get('superadmin')
  @Roles(Role.SUPER_ADMIN, Role.SUB_ADMIN, Role.BRANCH_MANAGER)
  getSuperAdminResource() {
    return { message: 'This is a Super Admin resource' };
  }
}