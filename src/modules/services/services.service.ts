import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'src/dto/response.dto';
import { Service } from 'src/entities/service.entity';
import { appendBaseUrlToImages } from 'src/utils/image-path.helper';
import { Repository } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
  ) {}

  async getAll(): Promise<Response> {
    const services = await this.serviceRepository.find({
      where: { deleted_at: null },
    });

    const service = appendBaseUrlToImages(services);
    return {
      statusCode: 200,
      message: 'Services retrieved successfully',
      data: { services: service },
    };
  }

  async findAll(): Promise<Response> {
    const services = await this.serviceRepository.find({
      where: { deleted_at: null },
    });

    const service = appendBaseUrlToImages(services);

    return {
      statusCode: 200,
      message: 'Service retrieved successfully',
      data: { service },
    };
  }

  async findOne(id: number): Promise<Response> {
    const service = await this.serviceRepository.findOne({
      where: { service_id: id, deleted_at: null },
    });
    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }

    const services = appendBaseUrlToImages([service])[0];

    return {
      statusCode: 200,
      message: 'Service retrieved successfully',
      data: { service: services },
    };
  }

  async create(
    createServiceDto: CreateServiceDto,
    imagePath: string,
  ): Promise<Response> {
    const service = this.serviceRepository.create({
      ...createServiceDto,
      image: imagePath,
    });

    const result = await this.serviceRepository.save(service);

    const services = appendBaseUrlToImages([result])[0];

    return {
      statusCode: 201,
      message: 'Service added successfully',
      data: { result: services },
    };
  }

  async update(
    id: number,
    updateServicetDto: UpdateServiceDto,
    imagePath: string,
  ): Promise<Response> {
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
    await this.serviceRepository.update(id, {
      ...updateServicetDto,
      image: imagePath,
    });

    const update_service = await this.serviceRepository.findOne({
      where: { service_id: id, deleted_at: null },
    });

    const services = appendBaseUrlToImages([update_service])[0];

    return {
      statusCode: 200,
      message: 'Service updated successfully',
      data: { update_service: services },
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

    const services = appendBaseUrlToImages([service])[0];

    service.deleted_at = new Date();
    await this.serviceRepository.save(service);

    return {
      statusCode: 200,
      message: 'Service deleted successfully',
      data: { service: services },
    };
  }
}
