import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { EntityManager } from 'typeorm';
import { IsUniqueConstraintInput } from './is-unique';

@ValidatorConstraint({ name: 'IsUniqueConstraint', async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly entitymanager: EntityManager) {}
  async validate(value: any, args?: ValidationArguments): Promise<boolean> {
    const { tablename, column }: IsUniqueConstraintInput = args.constraints[0];

    const exists = await this.entitymanager
      .getRepository(tablename)
      .createQueryBuilder(tablename)
      .where({ [column]: value })
      .getExists();

    return exists ? false : true;
  }
  defaultMessage(args?: ValidationArguments): string {
    return `user ${args.property} already registered with us.`;
  }
}
