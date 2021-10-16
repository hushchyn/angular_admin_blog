import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategoryRequest, ICategoryResponse } from 'src/app/interfaces/category.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url = environment.BACKEND_URL
  private api = { category: `${this.url}/category` }

  constructor( private http: HttpClient ) { }

  getAll(): Observable<ICategoryResponse[]>{
   return this.http.get<ICategoryResponse[]>(this.api.category)
  }

  getOne(id:number): Observable<ICategoryResponse>{
    return this.http.get<ICategoryResponse>(`${this.url}/${id}`)
  }

  create(category: ICategoryRequest):Observable<void>{
    return this.http.post<void>(this.api.category, category)
  }

  update(category: ICategoryRequest, id:number): Observable<void>{
    return this.http.patch<void>(`${this.api.category}/${id}`, category)
  }

  delete(id:number): Observable<void>{
    return this.http.delete<void>(`${this.api.category}/${id}`)
  }









}


