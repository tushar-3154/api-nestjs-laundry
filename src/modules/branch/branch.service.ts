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

  async findAll(): Promise<Response> {
    const result = await this.branchRepository.find();
    return {
      statusCode: 200,
      message: 'Branches retrieved successfully',
      data: { result },
    };
  }

  async findOne(id: number): Promise<Response> {
    const result = await this.branchRepository.findOne({
      where: { branch_id: id },
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
      where: { branch_id: id },
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
      where: { branch_id: id },
    });
    if (!branch) {
      return {
        statusCode: 404,
        message: 'Branch not found',
        data: null,
      };
    }

    await this.branchRepository.delete(id);
    return {
      statusCode: 200,
      message: 'Branch deleted successfully',
      data: { branch },
    };
  }
}
