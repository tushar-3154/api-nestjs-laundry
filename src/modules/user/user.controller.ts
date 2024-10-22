import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorator/roles.decorator';
import { Response } from 'src/dto/response.dto';
import { OtpType } from 'src/enum/otp.enum';
import { Role } from 'src/enum/role.enum';
import { RolesGuard } from '../auth/guard/role.guard';
import { PaginationQueryDto } from '../dto/pagination-query.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Patch('change-password')
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

  @Post('customers')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.SUPER_ADMIN, Role.SUB_ADMIN)
  async createCustomer(@Request() req, @Body() createUserDto: CreateUserDto) {
    const user = req.user;
    return await this.userService.createUser(user.user_id, createUserDto);
  }

  @Get('by-role')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.SUPER_ADMIN, Role.SUB_ADMIN)
  async getAllUsersByRole(
    @Query('role_id') role_id: number,
    @Query('search') search?: string,
  ): Promise<Response> {
    return this.userService.getAllUsersByRole(role_id, search);
  }

  @Post()
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.SUPER_ADMIN)
  async createUser(
    @Request() req,
    @Body() createUserDto: CreateUserDto,
  ): Promise<Response> {
    const user = req.user;
    return await this.userService.createUser(user.user_id, createUserDto);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.SUPER_ADMIN)
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Response> {
    return await this.userService.updateUser(id, updateUserDto);
  }

  @Get('delivery-boys')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.SUPER_ADMIN)
  async getDeliveryBoys(): Promise<Response> {
    return await this.userService.getAllDeliveryBoys();
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.SUPER_ADMIN)
  async getUserById(@Param('id') id: number): Promise<Response> {
    return await this.userService.getUserById(id);
  }

  @Get()
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.SUPER_ADMIN)
  async getAllUsers(
    @Query() paginationQueryDto: PaginationQueryDto,
  ): Promise<Response> {
    return await this.userService.getAllUsers(paginationQueryDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.SUPER_ADMIN)
  async deleteUser(@Param('id') id: number): Promise<Response> {
    return await this.userService.deleteUser(id);
  }

  @Post('generate')
  async generateOtp(@Body() body: { mobile_number: number; type: OtpType }) {
    const { mobile_number, type } = body;
    const otp = await this.userService.generateOtp(mobile_number, type);
    return {
      statusCode: 200,
      message: 'OTP generated successfully',
      data: { otp },
    };
  }

  @Post('validate')
  async validateOtp(@Body() body: { mobile_number: number; otp: number }) {
    const { mobile_number, otp } = body;
    const isValid = await this.userService.validateOtp(mobile_number, otp);
    if (isValid) {
      return { statusCode: 200, message: 'OTP is valid' };
    } else {
      throw new HttpException('Invalid OTP', HttpStatus.BAD_REQUEST);
    }
  }
}
