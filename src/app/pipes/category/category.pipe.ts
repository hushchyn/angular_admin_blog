import { Pipe, PipeTransform } from '@angular/core';
import { ICategoryResponse } from 'src/app/interfaces/category.interface';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(category: Array <ICategoryResponse>, field: string): Array<ICategoryResponse> {
    if (!field){
      return category
    }
    if (!category){
      return []
    }
    return category.filter(name => name.name.toLocaleLowerCase().includes(field.toLocaleLowerCase()))
  }
}
