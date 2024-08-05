import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorator/roles.decorator';
import { Response } from 'src/dto/response.dto';
import { Role } from 'src/enum/role.enum';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { RolesGuard } from './guard/role.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto): Promise<Response> {
    return this.authService.signup(signupDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<Response> {
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
