import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorator/roles.decorator';
import { Response } from 'src/dto/response.dto';
import { Role } from 'src/enum/role.enum';
import { RolesGuard } from '../auth/guard/role.guard';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-addresses.dto';
import { UpdateUserAddressDto } from './dto/update-address.dto';

@Controller('address')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard('jwt'))
@Roles(Role.CUSTOMER)
export class AddressController {
  constructor(private readonly userAddressService: AddressService) {}

  @Get()
  async getAll(@Request() req): Promise<Response> {
    const user = req.user;
    return this.userAddressService.getAll(user.user_id);
  }

  @Get(':id')
  async findOne(@Request() req, @Param('id') id: number): Promise<Response> {
    const user = req.user;
    return this.userAddressService.findOne(user.user_id, id);
  }

  @Post()
  async create(
    @Request() req,
    @Body() userAddress: CreateAddressDto,
  ): Promise<Response> {
    const user = req.user;

    return this.userAddressService.create(user.user_id, userAddress);
  }

  @Put(':id')
  async update(
    @Request() req,
    @Param('id') id: number,
    @Body() updateAddressDto: UpdateUserAddressDto,
  ): Promise<Response> {
    const user = req.user;

    return this.userAddressService.update(user.user_id, id, updateAddressDto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: number): Promise<Response> {
    const user = req.user;
    return this.userAddressService.remove(user.user_id, id);
  }
}
