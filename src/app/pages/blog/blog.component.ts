import { Component, OnInit } from '@angular/core';
import { IPostResponse } from 'src/app/interfaces/blog.interface';
import { BlogService } from 'src/app/services/blog/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  public posts: Array<IPostResponse>=[]


  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.loadPosts()
  }

  loadPosts(): void {
    this.blogService.getAll().subscribe(data => {
      this.posts = data;
      console.log(data);
      
    }, err => { console.log(err); }
    )
  }

}
