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
    const salt = await bcrypt.genSalt(10);

    const hashedpassword = await bcrypt.hash(signUpDto.password, salt);
    const user = this.userRepository.create({
      ...signUpDto,
      password: hashedpassword,
    });
    const result = await this.userRepository.save(user);

    return result;
  }

  async login(loginDto: LoginDto): Promise<User> {
    const { username, password } = loginDto;
    let mobileCondition = {};
    if (Number(username)) {
      mobileCondition = {
        mobile_number: Number(username),
      };
    }
    const user = await this.userRepository.findOne({
      where: [
        {
          email: username,
        },
        mobileCondition,
      ],
    });
    if (!user) {
      throw new UnauthorizedException(
        'Your username and password do not match with our records',
      );
    }
    const pass = await bcrypt.compare(password, user.password);

    if (!pass) {
      throw new UnauthorizedException(
        'Your username and password do not match with our records',
      );
    }
    return user;
  }
}
