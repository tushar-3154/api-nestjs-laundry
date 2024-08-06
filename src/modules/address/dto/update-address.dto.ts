import { PartialType } from '@nestjs/mapped-types';

import { CreateAddressDto } from './create-addresses.dto';

export class UpdateUserAddressDto extends PartialType(CreateAddressDto) {}
