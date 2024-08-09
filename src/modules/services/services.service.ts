import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'src/dto/response.dto';
import { Service } from 'src/entities/service.entity';
import { Repository } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
  ) {}

  async findAll(): Promise<Response> {
    const result = await this.serviceRepository.find({
      where: { deleted_at: null },
    });
    return {
      statusCode: 200,
      message: 'Service retrieved successfully',
      data: { result },
    };
  }

  async findOne(id: number): Promise<Response> {
    const product = await this.serviceRepository.findOne({
      where: { service_id: id, deleted_at: null },
    });
    if (!product) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return {
      statusCode: 200,
      message: 'Service retrieved successfully',
      data: { product },
    };
  }
  async create(
    createServiceDto: CreateServiceDto,
    imagePath: string,
  ): Promise<Response> {
    const product = this.serviceRepository.create({
      ...createServiceDto,
      image: imagePath,
    });

    const result = await this.serviceRepository.save(product);
    return {
      statusCode: 201,
      message: 'Service added successfully',
      data: { result },
    };
  }

  async update(
    id: number,
    updateServicetDto: UpdateServiceDto,
  ): Promise<Response> {
    const product = await this.serviceRepository.findOne({
      where: { service_id: id, deleted_at: null },
    });
    if (!product) {
      return {
        statusCode: 404,
        message: 'Service not found',
        data: null,
      };
    }
    await this.serviceRepository.update(id, updateServicetDto);

    const update_service = await this.serviceRepository.findOne({
      where: { service_id: id, deleted_at: null },
    });

    return {
      statusCode: 200,
      message: 'Service updated successfully',
      data: { update_service },
    };
  }

  async delete(id: number): Promise<Response> {
    const service = await this.serviceRepository.findOne({
      where: { service_id: id, deleted_at: null },
    });
    if (!service) {
      return {
        statusCode: 404,

        message: 'Service not found',
        data: null,
      };
    }

    service.deleted_at = new Date();
    await this.serviceRepository.save(service);

    return {
      statusCode: 200,
      message: 'Service deleted successfully',
      data: service,
    };
  }
}
