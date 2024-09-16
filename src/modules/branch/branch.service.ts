import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'src/dto/response.dto';
import { Branch } from 'src/entities/branch.entity';
import { Repository } from 'typeorm';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-brach.dto';

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(Branch)
    private branchRepository: Repository<Branch>,
  ) {}

  async create(createBranchDto: CreateBranchDto): Promise<Response> {
    const branch = this.branchRepository.create(createBranchDto);
    const result = await this.branchRepository.save(branch);

    return {
      statusCode: 201,
      message: 'Branch added successfully',
      data: { result },
    };
  }

  async findAll(per_page?: number, page_number?: number): Promise<Response> {
    const pageNumber = page_number ?? 1;
    const perPage = per_page ?? 10;
    const skip = (page_number - 1) * per_page;

    const [result, total] = await this.branchRepository.findAndCount({
      where: { deleted_at: null },
      take: perPage,
      skip: skip,
    });

    return {
      statusCode: 200,
      message: 'Branches retrieved successfully',
      data: { result, limit: per_page, page_number: pageNumber, count: total },
    };
  }

  async findOne(id: number): Promise<Response> {
    const result = await this.branchRepository.findOne({
      where: { branch_id: id, deleted_at: null },
    });
    if (!result) {
      return {
        statusCode: 404,
        message: 'Branch not found',
        data: null,
      };
    }
    return {
      statusCode: 200,
      message: 'Branch retrieved successfully',
      data: { result },
    };
  }

  async update(
    id: number,
    updateBranchDto: UpdateBranchDto,
  ): Promise<Response> {
    const branch = await this.branchRepository.findOne({
      where: { branch_id: id, deleted_at: null },
    });
    if (!branch) {
      return {
        statusCode: 404,
        message: 'Branch not found',
        data: null,
      };
    }

    await this.branchRepository.update(id, updateBranchDto);
    const updatedBranch = await this.branchRepository.findOne({
      where: { branch_id: id },
    });

    return {
      statusCode: 200,
      message: 'Branch updated successfully',
      data: { updatedBranch },
    };
  }

  async delete(id: number): Promise<Response> {
    const branch = await this.branchRepository.findOne({
      where: { branch_id: id, deleted_at: null },
    });
    if (!branch) {
      return {
        statusCode: 404,
        message: 'Branch not found',
        data: null,
      };
    }

    branch.deleted_at = new Date();
    await this.branchRepository.save(branch);
    return {
      statusCode: 200,
      message: 'Branch deleted successfully',
      data: { branch },
    };
  }
}
