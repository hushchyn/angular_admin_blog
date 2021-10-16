import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators} from '@angular/forms';
import { IPostResponse } from 'src/app/interfaces/blog.interface';
import { BlogService } from 'src/app/services/blog/blog.service';

@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.scss']
})
export class AdminBlogComponent implements OnInit {

  public posts: Array<IPostResponse>=[]
  public postForm!: FormGroup;
  public currentID!: number;
  public editStatus = true


  constructor( 
    private blogService: BlogService,
    private fb: FormBuilder 
    ){ }
  
    ngOnInit(): void {
      this.initPostForm(),
      this.loadPosts()
  }

  trackBy(index: number): number {
    return index;
  }

  private initPostForm():void{
    this.postForm = this.fb.group({
      title: [null, Validators.required],
      text: [null, Validators.required],
      author: [null,Validators.required],
      date: [null],
      imgPath: [null]
    })
  }

  loadPosts(): void {
    this.blogService.getAll().subscribe(data => {
      console.log(data);
      this.posts = data;
    }, err => { console.log(err);})
  }

  createPost():void{
    this.setPostImage();
    this.setPostTime();
    this.blogService.create(this.postForm.value).subscribe(() =>{
      this.loadPosts()
      this.postForm.reset();
      }
    )
  }

  private setPostImage(): void {
    this.postForm.get('imgPath')?.setValue('https://druziatesta.ru/wp-content/uploads/chilichocola-pizza-master-klass.jpg');
  }

  private setPostTime(): void {
    this.postForm.get('date')?.setValue(new Date());
  }

  editPost(post: IPostResponse):void{
    this.postForm.patchValue(post);
    this.currentID = post.id
    this.editStatus = false
  }

  savePost():void{
    this.blogService.updatePost(this.postForm.value, this.currentID).subscribe(() => {
      this.loadPosts()
      this.postForm.reset();
      this.editStatus = true
    }, err => {
      console.log(err);})
  }

  deletePost(post:IPostResponse):void{
    this.blogService.delete(post.id).subscribe(() => {
      this.loadPosts()
    }, err => { console.log(err);})
  }

}
