import { PartialType } from '@nestjs/mapped-types';

import { CreateAddressDto } from './addresses.dto';

export class UpdateUserAddressDto extends PartialType(CreateAddressDto) {}
