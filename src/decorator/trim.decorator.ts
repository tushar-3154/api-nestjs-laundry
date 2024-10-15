import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class TrimValidator implements ValidatorConstraintInterface {
  validate(value: any) {
    if (typeof value === 'string') {
      const trimmedValue = value.trim();
      return trimmedValue.length > 0;
    }
    return false;
  }

  defaultMessage() {
    return 'Search value cannot be empty or just whitespace';
  }
}

export function IsTrimmedString(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isTrimmedString',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: TrimValidator,
    });
  };
}
