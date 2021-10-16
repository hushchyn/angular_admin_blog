import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryRequest, ICategoryResponse } from 'src/app/interfaces/category.interface';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss']
})
export class AdminCategoriesComponent implements OnInit {
  @ViewChild('close') close!: ElementRef
  

  public categories: Array<ICategoryResponse> = []
  public categoryForm!: FormGroup;
  public currentID!: number;
  public editStatus = true
  public field!: string;

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.loadCategory();
    this.initCategoryForm();
  }

  initCategoryForm():void{
    this.categoryForm = this.fb.group({
      name:[null, Validators.required]
    })
  }


  loadCategory():void{
    this.categoryService.getAll().subscribe(data => {
      this.categories = data
    }, err =>{
      console.log(err);
    })
  }

  createCategory():void{
    this.categoryService.create(this.categoryForm.value).subscribe(() => {
      this.loadCategory()
      this.categoryForm.reset()
      this.close.nativeElement.click()
    })
  }

  editCategory(category: ICategoryResponse):void{
    this.categoryForm.patchValue(category)
    this.editStatus = false
    this.currentID = category.id
  }

  saveEdit():void{
    this.categoryService.update(this.categoryForm.value, this.currentID).subscribe(() => {
      this.loadCategory()
      this.editStatus = true
      this.close.nativeElement.click()
      this.categoryForm.reset()
    }, err => {
      console.log(err);
    })
  }

  deleteCategory(category: ICategoryResponse):void{
    this.categoryService.delete(category.id).subscribe(() => {
      this.loadCategory()
    }, err => {
      console.log(err);
    })
  }


}
