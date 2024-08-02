import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { type } from 'os';
import { SignupDto } from 'src/dto/signup.dto';
import { Role } from 'src/entities/role.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,

    private jwtService: JwtService,
  ) {}

  async signup(signUpDto: SignupDto): Promise<{ token: string }> {
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
    console.log('hashedpassword', hashedpassword);

    const user = this.userRepository.create({
      email,
      password: hashedpassword,
      role,
    });
    await this.userRepository.save(user);

    const token = this.jwtService.sign({ id: user.id });

    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid Credintials');
    }

    if (!password) {
      throw new UnauthorizedException('Password or stored password is missing');
    }

    const pass = await bcrypt.compare(password, user.password);
    console.log(pass);

    if (!pass) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({
      email: user.email,
      id: user.id,
      role_id: user.role_id,
      type: type,
    });
    return { token };
  }

  async validateUser(decoded: any): Promise<any> {
    return { id: decoded.id, roles: decoded.roles };
  }
}
