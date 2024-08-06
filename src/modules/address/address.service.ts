import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'src/dto/response.dto';
import { UserAddress } from 'src/entities/address.entity';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/addresses.dto';
import { UpdateUserAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(UserAddress)
    private userAddressRepository: Repository<UserAddress>,
  ) {}

  async getAll(): Promise<Response> {
    const result = await this.userAddressRepository.find();

    return {
      statusCode: 200,
      message: 'Addresses retrieved successfully',
      data: { result },
    };
  }

  async findOne(id: number): Promise<Response> {
    const result = await this.userAddressRepository.findOne({ where: { id } });

    if (!result) {
      throw new NotFoundException('Address not found');
    }

    return {
      statusCode: 200,
      message: 'Address retrieved successfully',
      data: { result },
    };
  }

  async create(createAddressdto: CreateAddressDto): Promise<Response> {
    const result = await this.userAddressRepository.save(createAddressdto);

    return {
      statusCode: 201,
      message: 'Address added successfully',
      data: { result },
    };
  }

  async update(
    id: number,
    updateAddressdto: UpdateUserAddressDto,
  ): Promise<Response> {
    const address = await this.userAddressRepository.findOneBy({
      id: id,
    });

    if (!address) {
      return {
        statusCode: 404,
        message: 'Address not found',
        data: null,
      };
    }

    await this.userAddressRepository.update(id, updateAddressdto);

    const updatedAddress = await this.userAddressRepository.findOneBy({
      id: id,
    });
    return {
      statusCode: 200,
      message: 'Address updated successfully',
      data: { updatedAddress },
    };
  }

  async remove(id: number): Promise<Response> {
    const result = await this.userAddressRepository.delete(id);

    if (result.affected === 0) {
      return {
        statusCode: 404,
        message: 'Address not found',
        data: null,
      };
    }

    return {
      statusCode: 200,
      message: 'Address deleted successfully',
      data: null,
    };
  }
}
