import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entities/role.entity';
import { User } from 'src/entities/user.entity';
import { SignupDto } from 'src/modules/auth/dto/signup.dto';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,

    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async signup(signUpDto: SignupDto): Promise<{ token: string }> {
    const user = await this.userService.signup(signUpDto);
    const token = this.jwtService.sign({ id: user.id });

    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const user = await this.userService.login(loginDto);
    const token = this.jwtService.sign({
      email: user.email,
      id: user.id,
      role_id: user.role_id,
    });
    return { token };
  }
}
