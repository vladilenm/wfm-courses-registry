import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], filterString: string, fieldName: string): any {
    if (items.length === 0 || filterString === '') {
      return items;
    }

    return items.filter(item => item[fieldName].toLowerCase().indexOf(filterString.toLowerCase()) !== -1);
  }

}
