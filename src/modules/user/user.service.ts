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
    const {
      first_name,
      last_name,
      email,
      mobile_number,
      password,
      role_id,
      gender,
    } = signUpDto;
    const salt = await bcrypt.genSalt(10);

    const hashedpassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      first_name,
      last_name,
      mobile_number,
      email,
      password: hashedpassword,
      gender,
      role_id,
    });
    const result = await this.userRepository.save(user);

    return result;
  }

  async login(loginDto: LoginDto): Promise<User> {
    const { mobile_number, email, password } = loginDto;

    let user: User;

    if (mobile_number) {
      user = await this.userRepository.findOne({ where: { mobile_number } });
    } else if (email) {
      user = await this.userRepository.findOne({ where: { email } });
    } else {
      throw new UnauthorizedException('Username or mobilenumber is required');
    }

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
