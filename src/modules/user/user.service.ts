import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Response } from 'src/dto/response.dto';
import { User } from 'src/entities/user.entity';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { SignupDto } from 'src/modules/auth/dto/signup.dto';
import { Repository } from 'typeorm';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
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

  async login(loginDto: LoginDto): Promise<Response> {
    const { username, password, role_id } = loginDto;
    let mobileCondition = {};
    if (Number(username)) {
      mobileCondition = {
        mobile_number: Number(username),
        role_id: role_id,
      };
    }
    const user = await this.userRepository.findOne({
      where: [
        {
          email: username,
          role_id: role_id,
        },
        mobileCondition,
      ],
    });
    const loginErrrorMessage = {
      statusCode: 403,
      message: 'Your username and password do not match with our records',
    };
    if (!user) {
      return loginErrrorMessage;
    }
    const pass = await bcrypt.compare(password, user.password);

    if (!pass) {
      return loginErrrorMessage;
    }

    return {
      statusCode: 200,
      message: 'User Loggedin succssfully',
      data: { user },
    };
  }

  async changePassword(
    user_id: number,
    changePasswordDto: ChangePasswordDto,
  ): Promise<Response> {
    const { old_password, new_password } = changePasswordDto;
    const user = await this.userRepository.findOne({
      where: { user_id: user_id },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isOldPasswordValid = await bcrypt.compare(
      old_password,
      user.password,
    );

    if (!isOldPasswordValid) {
      throw new BadRequestException('Old password is incorrect');
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(new_password, salt);
    await this.userRepository.save(user);
    delete user.password;
    return {
      statusCode: 200,
      message: 'password change succssfully',
      data: { user },
    };
  }
}
