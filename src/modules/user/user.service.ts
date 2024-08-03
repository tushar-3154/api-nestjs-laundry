import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/entities/role.entity';
import { User } from 'src/entities/user.entity';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { SignupDto } from 'src/modules/auth/dto/signup.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  async signup(signUpDto: SignupDto): Promise<User> {
    const { email, password, role_id } = signUpDto;
    const existinguser = await this.userRepository.findOne({
      where: { email },
    });

    const role = await this.roleRepository.findOne({ where: { id: role_id } });
    if (!role) throw new Error('Role not found');
    if (existinguser) {
      throw new Error('User is already exists');
    }
    const salt = await bcrypt.genSalt(10);

    const hashedpassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      email,
      password: hashedpassword,
      role,
    });
    const result = await this.userRepository.save(user);

    return result;
  }

  async login(loginDto: LoginDto): Promise<User> {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid Credintials');
    }

    if (!password) {
      throw new UnauthorizedException('Password or stored password is missing');
    }

    const pass = await bcrypt.compare(password, user.password);

    if (!pass) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}
