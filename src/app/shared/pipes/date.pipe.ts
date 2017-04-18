import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'wmfDate'
})
export class WFMDatePipe implements PipeTransform {
  transform(value): any {
    return moment(value, 'YYYY.MM.DD').format('DD.MM.YYYY');
  }
}
