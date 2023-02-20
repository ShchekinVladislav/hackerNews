import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'customDatePipe'
})
export class CustomDatePipePipe implements PipeTransform {
  transform(date: number, lang?: string): string {

    const event = new Date(date * 1000);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };
    if (lang) {
      return event.toLocaleDateString(`${lang.toLocaleLowerCase()}-${lang.toLocaleUpperCase()}`, options);
    } else {
      return event.toLocaleDateString('en-EN', options);
    }
  }
}
