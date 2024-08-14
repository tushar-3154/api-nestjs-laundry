import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'login_history' })
export class LoginHistory {
  @PrimaryGeneratedColumn()
  login_id: number;

  @ManyToOne(() => User, (user) => user.loginHistories)
  user: User;

  @Column({ type: 'varchar', length: 20 })
  type: string;

  @CreateDateColumn()
  created_at: Date;
}
