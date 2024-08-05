import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  firstname: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  lastname: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string;

  @Column({ type: 'decimal', nullable: true })
  mobilenumber: number;

  @Column()
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  gender: string;

  @Column()
  role_id: number;

  @ManyToOne(() => Role, (role) => role.users, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
