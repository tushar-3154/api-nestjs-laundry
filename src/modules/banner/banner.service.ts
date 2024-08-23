import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'src/dto/response.dto';
import { Banner } from 'src/entities/banner.entity';
import { appendBaseUrlToImages } from 'src/utils/image-path.helper';
import { Repository } from 'typeorm';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(Banner)
    private BannerRepository: Repository<Banner>,
  ) {}

  async getAll(): Promise<Response> {
    const banner = await this.BannerRepository.find({
      where: { deleted_at: null },
    });

    const Banner = appendBaseUrlToImages(banner);

    return {
      statusCode: 200,
      message: 'banner retrieved successfully',
      data: { banner: Banner },
    };
  }

  async create(
    createBannerDto: CreateBannerDto,
    imagePath: string,
  ): Promise<Response> {
    const banner = this.BannerRepository.create({
      ...createBannerDto,
      image: imagePath,
    });

    const result = await this.BannerRepository.save(banner);
    const Banner = appendBaseUrlToImages([result])[0];
    return {
      statusCode: 201,
      message: 'banner added successfully',
      data: { result: Banner },
    };
  }

  async findAll(): Promise<Response> {
    const banner = await this.BannerRepository.find({
      where: { deleted_at: null },
    });

    const Banner = appendBaseUrlToImages(banner);

    return {
      statusCode: 200,
      message: 'banner retrieved successfully',
      data: { banner: Banner },
    };
  }

  async findOne(id: number): Promise<Response> {
    const banner = await this.BannerRepository.findOne({
      where: { banner_id: id, deleted_at: null },
    });
    if (!banner) {
      throw new NotFoundException(`Banner with ID ${id} not found`);
    }
    const Banner = appendBaseUrlToImages([banner])[0];
    return {
      statusCode: 200,
      message: 'Banner retrieved successfully',
      data: { banner: Banner },
    };
  }

  async update(
    id: number,
    updateBannerDto: UpdateBannerDto,
    imagePath?: string,
  ): Promise<Response> {
    const banner = await this.BannerRepository.findOne({
      where: { banner_id: id, deleted_at: null },
    });
    if (!banner) {
      return {
        statusCode: 404,
        message: 'banner not found',
        data: null,
      };
    }
    // await this.BannerRepository.update(id, {
    //   ...updateBannerDto,
    //   image: imagePath,
    // });
    const updateData = {
      ...updateBannerDto,
    };

    if (imagePath) {
      updateData.image = imagePath;
    }

    await this.BannerRepository.update(id, updateData);

    const update_banner = await this.BannerRepository.findOne({
      where: { banner_id: id, deleted_at: null },
    });

    const Banner = appendBaseUrlToImages([update_banner])[0];

    return {
      statusCode: 200,
      message: 'banner updated successfully',
      data: { update_banner: Banner },
    };
  }

  async delete(id: number): Promise<Response> {
    const banner = await this.BannerRepository.findOne({
      where: { banner_id: id, deleted_at: null },
    });
    if (!banner) {
      return {
        statusCode: 404,
        message: 'banner not found',
        data: null,
      };
    }

    const Banner = appendBaseUrlToImages([banner])[0];
    banner.deleted_at = new Date();
    await this.BannerRepository.save(banner);

    return {
      statusCode: 200,
      message: 'Banner deleted successfully',
      data: { banner: Banner },
    };
  }
}
