import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'mapFilter'
})
export class MapFilterPipe implements PipeTransform {

  constructor(private san: DomSanitizer){}

  transform(url: string) {
    return this.san.bypassSecurityTrustResourceUrl(url);
  }

}
