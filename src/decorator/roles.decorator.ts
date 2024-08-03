import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/enum/role.enum';

export const ROLES_KEY = 'role_id';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
