import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';

import { Response } from 'src/dto/response.dto';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/addresses.dto';
import { UpdateUserAddressDto } from './dto/update-address.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly userAddressService: AddressService) {}

  @Get()
  async getAll(): Promise<Response> {
    return this.userAddressService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Response> {
    return this.userAddressService.findOne(id);
  }

  @Post()
  async create(@Body() userAddress: CreateAddressDto): Promise<Response> {
    return this.userAddressService.create(userAddress);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateAddressDto: UpdateUserAddressDto,
  ): Promise<Response> {
    return this.userAddressService.update(id, updateAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<Response> {
    return this.userAddressService.remove(id);
  }
}
