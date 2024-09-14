import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'src/dto/response.dto';
import { Company } from 'src/entities/company.entity';
import { appendBaseUrlToLogo } from 'src/utils/image-path.helper';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async create(
    createCompanyDto: CreateCompanyDto,
    logoPath: string,
  ): Promise<Response> {
    const company = this.companyRepository.create({
      ...createCompanyDto,
      logo: logoPath,
    });
    const result = await this.companyRepository.save(company);

    const Company = appendBaseUrlToLogo([result])[0];

    return {
      statusCode: 201,
      message: 'company added successfully',
      data: { result: Company },
    };
  }

  async findAll(per_page?: number, page_number?: number): Promise<Response> {
    const pagenumber = page_number ?? 1;
    const perpage = per_page ?? 10;
    const skip = (pagenumber - 1) * perpage;

    const [result, total] = await this.companyRepository.findAndCount({
      where: { deleted_at: null },
      take: perpage,
      skip: skip,
    });

    const companiesWithBaseUrl = appendBaseUrlToLogo(result);

    return {
      statusCode: 200,
      message: 'Companies retrieved successfully',
      data: {
        result: companiesWithBaseUrl,
        limit: perpage,
        page_number: pagenumber,
        count: total,
      },
    };
  }

  async findOne(id: number): Promise<Response> {
    const result = await this.companyRepository.findOne({
      where: { company_id: id, deleted_at: null },
    });

    const Company = appendBaseUrlToLogo([result])[0];
    return {
      statusCode: 200,
      message: 'company retrieved successfully',
      data: { result: Company },
    };
  }

  async update(
    id: number,
    updateCompanyDto: UpdateCompanyDto,
    logoPath?: string,
  ): Promise<Response> {
    const company = await this.companyRepository.findOne({
      where: { company_id: id, deleted_at: null },
    });

    if (!company) {
      return {
        statusCode: 404,
        message: 'company not found',
        data: null,
      };
    }

    const updateData = {
      ...updateCompanyDto,
    };

    if (logoPath) {
      updateData.logo = logoPath;
    }

    await this.companyRepository.update(id, updateData);

    const update_company = await this.companyRepository.findOne({
      where: { company_id: id, deleted_at: null },
    });

    const Company = appendBaseUrlToLogo([update_company])[0];

    return {
      statusCode: 200,
      message: 'Company updated successfully',
      data: { update_company: Company },
    };
  }

  async delete(id: number): Promise<Response> {
    const company = await this.companyRepository.findOne({
      where: { company_id: id, deleted_at: null },
    });
    if (!company) {
      return {
        statusCode: 404,
        message: 'company not found',
        data: null,
      };
    }

    const Company = appendBaseUrlToLogo([company])[0];

    company.deleted_at = new Date();
    await this.companyRepository.save(company);

    return {
      statusCode: 200,
      message: 'company deleted successfully',
      data: { company: Company },
    };
  }
}
