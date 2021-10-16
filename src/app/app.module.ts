import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BlogComponent } from './pages/blog/blog.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminBlogComponent } from './pages/admin/admin-blog/admin-blog.component';
import { AdminCategoriesComponent } from './pages/admin/admin-categories/admin-categories.component';
import { ProductsComponent } from './pages/products/products.component';
import { CategoryPipe } from './pipes/category/category.pipe';
import { AdminProductsComponent } from './pages/admin/admin-products/admin-products.component';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { ProductPipe } from './pipes/product/search.pipe';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BlogComponent,
    AdminComponent,
    AdminBlogComponent,
    AdminCategoriesComponent,
    ProductsComponent,
    CategoryPipe,
    AdminProductsComponent,
    ProductPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
