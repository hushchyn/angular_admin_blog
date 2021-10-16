import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getDownloadURL, getStorage, ref, uploadBytes, Storage } from "@angular/fire/storage";
import { ICategoryResponse } from 'src/app/interfaces/category.interface';
import { IProductResponse } from 'src/app/interfaces/product.interface';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';
import { IPostResponse } from 'src/app/interfaces/blog.interface';
import { deleteObject } from '@firebase/storage';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  @ViewChild('close') close!: ElementRef;

  public categories: Array<ICategoryResponse> = [] 
  public products: Array<IProductResponse> = [];
  public formProduct!: FormGroup;
  public editStatus = false
  public isUploaded = false;
  public field!: string;
  public deleteConfirm!: boolean;
  public currentProduct!: number;
  public imagePath!: string;
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private storage: Storage
    ) { }

  ngOnInit(): void {
    this.initFormProduct()
    this.loadCategories()
    this.loadProducts()
  }

  loadProducts():void{
    this.productService.getAll().subscribe(data => {
      this.products = data
    })
  }

  initFormProduct():void{
    this.formProduct = this.fb.group({
      category: [null, Validators.required],
      name: [null, Validators.required],
      description: [null, Validators.required],
      price: [null, Validators.required],
      imagePath: [null, Validators.required],
    })
  }

  loadCategories():void{
    this.categoryService.getAll().subscribe(data => {
      this.categories = data
    }, err => {
      console.log(err);   
    })
  }

  createProduct():void{
    this.productService.create(this.formProduct.value).subscribe( () => {
      this.loadProducts();
      this.formProduct.reset();
      this.close.nativeElement.click()
    }, err => {
      console.log(err);
    })
  }

  deleteProduct(product: IProductResponse):void{
    this.currentProduct = product.id
    this.imagePath = product.imagePath
  }

  confirmDelete():void{
    this.productService.delete(this.currentProduct).subscribe(() => {
      this.loadProducts()
      this.deleteImage(this.imagePath)
      this.deleteImage(this.imagePath)
    }, err => {
      console.log(err);
    })
  }

  upload(event: any): void {
    const file = event.target.files[0].name;
    this.uploadFile('images', file.name, file)
      .then(data => {
        console.log(data);
        
        this.formProduct.patchValue({
          imagePath: data
        });
        this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);
      })
  }

  async uploadFile(folder: string, name: string, file: File | null): Promise<string> {
    const ext = file!.name.split('.').pop();
    const path = `${folder}/${name}.${ext}`; {
      if (file) {
        try {
          const storageRef = ref(this.storage, path);
          const task = uploadBytes(storageRef, file);
          await task;
          return await getDownloadURL(storageRef);
        } catch (e: any) {
          return e.message
        }
      } else {
        return '';
      }
    }
  }

  deleteImage(imagePath: string): void {
    const task = ref(this.storage, imagePath);
    deleteObject(task).then(() => {
      this.formProduct.patchValue({
        imagePath: null
      })
    })
  }


}
