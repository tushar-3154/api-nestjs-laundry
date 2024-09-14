import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorator/roles.decorator';
import { Response } from 'src/dto/response.dto';
import { Role } from 'src/enum/role.enum';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { SendResetLinkDto } from './dto/send-reset-link.dto';
import { SignupDto } from './dto/signup.dto';
import { RolesGuard } from './guard/role.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto): Promise<Response> {
    return this.authService.signup(signupDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<Response> {
    return this.authService.login(loginDto);
  }

  @Post('forgot-password')
  async sendResetLink(
    @Body() sendResetLinkDto: SendResetLinkDto,
  ): Promise<Response> {
    return this.userService.sendPasswordResetLink(
      sendResetLinkDto.mobile_number,
    );
  }

  @Post('reset-password')
  async resetPassword(
    @Query('token') token: string,
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<Response> {
    return this.userService.resetPassword(token, resetPasswordDto.new_password);
  }

  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard('jwt'))
  @Get('superadmin')
  @Roles(Role.SUPER_ADMIN, Role.SUB_ADMIN, Role.BRANCH_MANAGER)
  getSuperAdminResource() {
    return { message: 'This is a Super Admin resource' };
  }
}
