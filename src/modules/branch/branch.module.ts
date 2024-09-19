import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from 'src/entities/branch.entity';
import { Company } from 'src/entities/company.entity';
import { CompanyService } from '../company/company.service';
import { BranchController } from './branch.controller';
import { BranchService } from './branch.service';

@Module({
  imports: [TypeOrmModule.forFeature([Branch, Company])],
  controllers: [BranchController],
  providers: [BranchService, CompanyService],
  exports: [BranchService],
})
export class BranchModule {}
