import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPostRequest, IPostResponse } from 'src/app/interfaces/blog.interface';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private url = environment.BACKEND_URL;
  private api = { posts: `${this.url}/posts` }

  constructor( private http: HttpClient ) { }

  getAll(): Observable<IPostResponse[]>{
   return this.http.get<IPostResponse[]>(this.api.posts)
  }

  getOne(id:number): Observable<IPostResponse>{
    return this.http.get<IPostResponse>(`${this.api.posts}/${id}`)
  }

  create(post:IPostRequest): Observable<void>{
    return this.http.post<void>(this.api.posts, post)
  }

  updatePost(post:IPostRequest, id:number): Observable<void>{
    return this.http.patch<void>(`${this.api.posts}/${id}`,post)
  }

  delete(id:number):Observable<void>{
    return this.http.delete<void>(`${this.api.posts}/${id}`)
  }




}
