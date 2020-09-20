import { Pipe, PipeTransform } from '@angular/core';
import { Brewery } from '../models/brewery';

@Pipe({
  name: 'nameFilter'
})
export class NameFilterPipe implements PipeTransform {

  transform(value: Brewery[], name: string, ...args: unknown[]): Brewery[] {
    const sorted = value.sort( (first, second) => {
      return first.id - second.id;
  });

    if (name) {
      return sorted.filter( (r) => {
        return (r.name.toLowerCase())
          .includes(name.toLowerCase());
      });
    }

    return sorted;
  }
}
