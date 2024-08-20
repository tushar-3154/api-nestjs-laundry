import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'src/dto/response.dto';
import { Setting } from 'src/entities/settings.entity';
import { DataSource, IsNull, Repository } from 'typeorm';
import { UpdateSettingDto } from './dto/update-settings.dto';

@Injectable()
export class SettingService {
  constructor(
    @InjectRepository(Setting)
    private settingRepository: Repository<Setting>,
    private dataSource: DataSource,
  ) {}
  async update(
    id: number,
    updateSettingDto: UpdateSettingDto,
  ): Promise<Response> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.update(
        Setting,
        { deleted_at: IsNull() },
        { deleted_at: new Date() },
      );

      await queryRunner.manager.save(Setting, updateSettingDto);

      await queryRunner.commitTransaction();

      return {
        statusCode: 200,
        message: 'Settings updated successfully',
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
