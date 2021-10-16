import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPostResponse } from 'src/app/interfaces/blog.interface';
import { IProductRequest, IProductResponse } from 'src/app/interfaces/product.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = environment.BACKEND_URL
  private api = { product: `${this.url}/product` } 

  constructor(private http: HttpClient) { }

  getAll():Observable<IProductResponse[]>{
    return this.http.get<IProductResponse[]>(this.api.product)
  }

  getOne(id:number):Observable<IPostResponse>{
    return this.http.get<IPostResponse>(`${this.api.product}/${id}`)

  }

  create(product: IProductRequest): Observable<void>{
    return this.http.post<void>(this.api.product, product)
  }

  delete(id:number): Observable<void>{
    return this.http.delete<void>(`${this.api.product}/${id}`)
  }




}
