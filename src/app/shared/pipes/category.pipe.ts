import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category',
})
export class CategoryPipe implements PipeTransform {
  transform(value: string): string {
    if (value === 'Front-end') {
      return 'code';
    }

    if (value === 'Back-end') {
      return 'computer';
    }

    return 'phone_android';
  }
}
