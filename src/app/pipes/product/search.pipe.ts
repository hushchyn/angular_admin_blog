import { Pipe, PipeTransform } from '@angular/core';
import { IProductResponse } from 'src/app/interfaces/product.interface';

@Pipe({
  name: 'search'
})
export class ProductPipe implements PipeTransform {

  transform(products: Array<IProductResponse>, field: string,): any {
  if (!field){
      return products
    }
  if (!products){
      return []
    }
  if (products.filter(product => product.name.toLowerCase().includes(field.toLowerCase())).length > 0) {
      return products.filter(product => product.name.toLowerCase().includes(field.toLowerCase()))
    }
  if (products.filter(product => product.description.toLowerCase().includes(field.toLowerCase())).length > 0) {
      return products.filter(product => product.description.toLowerCase().includes(field.toLowerCase()))
    }
  if (products.filter(product => product.category.name.toLowerCase().includes(field.toLowerCase())).length > 0) {
    return products.filter(product => product.category.name.toLowerCase().includes(field.toLowerCase()))
    }
    return []
  }
}
