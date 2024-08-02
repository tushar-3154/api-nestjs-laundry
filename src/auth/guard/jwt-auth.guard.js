import { AuthGuard } from '@nestjs/passport';
// import { JwtGuard } from '../auth/guard';

export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
}
