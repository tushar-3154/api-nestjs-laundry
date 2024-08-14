import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'login_history' })
export class LoginHistory {
  @PrimaryGeneratedColumn()
  login_id: number;

  @Column({ type: 'int' })
  user_id: number;

  @ManyToOne(() => User, (user) => user.loginHistories)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'varchar', length: 20 })
  type: string;

  @CreateDateColumn()
  created_at: Date;
}
