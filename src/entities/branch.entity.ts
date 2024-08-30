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
  branch_Name: string;

  @Column({ type: 'varchar', length: 255 })
  branch_Address: string;

  @Column({ type: 'varchar', length: 100 })
  branch_Manager: string;

  @Column({ type: 'varchar', length: 20 })
  branch_Phone_Number: string;

  @Column({ type: 'varchar', length: 255 })
  branch_Email: string;

  @Column({ type: 'varchar', length: 100 })
  branch_Registration_Number: string;

  @ManyToOne(() => Company, (company) => company.branches)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @Column({ type: 'int' })
  company_id: number;
}
