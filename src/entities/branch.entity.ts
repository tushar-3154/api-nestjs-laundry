import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Company } from './company.entity';

@Entity({ name: 'branches' })
export class Branch extends BaseEntity {
  @PrimaryGeneratedColumn()
  branch_id: number;

  @Column({ type: 'varchar', length: 255 })
  branch_name: string;

  @Column({ type: 'varchar', length: 255 })
  branch_address: string;

  @Column({ type: 'varchar', length: 100 })
  branch_manager: string;

  @Column({ type: 'varchar', length: 20 })
  branch_phone_number: string;

  @Column({ type: 'varchar', length: 255 })
  branch_email: string;

  @Column({ type: 'varchar', length: 100 })
  branch_registration_number: string;

  @ManyToOne(() => Company, (company) => company.branches)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @Column({ type: 'int' })
  company_id: number;
}
