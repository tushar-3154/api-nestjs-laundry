import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class TrimPipe implements PipeTransform {
  transform(value: any) {
    if (typeof value !== 'object' || value === null) return value;

    const trimmedObject = this.trimStrings(value);
    return trimmedObject;
  }

  private trimStrings(obj: any): any {
    if (typeof obj !== 'object' || obj === null) return obj;

    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        obj[key] = obj[key].trim();
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        this.trimStrings(obj[key]);
      }
    }

    return obj;
  }
}
