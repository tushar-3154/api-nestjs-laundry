import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorator/roles.decorator';
import { Response } from 'src/dto/response.dto';
import { Role } from 'src/enum/role.enum';
import { SignupDto } from '../auth/dto/signup.dto';
import { RolesGuard } from '../auth/guard/role.guard';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private userService: UserService) {}

  @Patch('change-password')
  @UseGuards(AuthGuard('jwt'))
  async changePassword(
    @Request() req,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<Response> {
    const user = req.user;
    return await this.userService.changePassword(
      user.user_id,
      changePasswordDto,
    );
  }

  @Post()
  @Roles(Role.SUPER_ADMIN)
  async createUser(@Body() signUpDto: SignupDto): Promise<Response> {
    return await this.userService.createUser(signUpDto);
  }

  @Put(':id')
  @Roles(Role.SUPER_ADMIN)
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Response> {
    return await this.userService.updateUser(id, updateUserDto);
  }

  @Get(':id')
  @Roles(Role.SUPER_ADMIN)
  async getUserById(@Param('id') id: number): Promise<Response> {
    return await this.userService.getUserById(id);
  }

  @Get()
  @Roles(Role.SUPER_ADMIN)
  async getAllUsers(): Promise<Response> {
    return await this.userService.getAllUsers();
  }

  @Delete(':id')
  @Roles(Role.SUPER_ADMIN)
  async deleteUser(@Param('id') id: number): Promise<Response> {
    return await this.userService.deleteUser(id);
  }
}
