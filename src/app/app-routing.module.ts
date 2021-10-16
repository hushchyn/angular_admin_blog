import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { BlogComponent } from './pages/blog/blog.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminBlogComponent } from './pages/admin/admin-blog/admin-blog.component';
import { ProductsComponent } from './pages/products/products.component';
import { AdminCategoriesComponent } from './pages/admin/admin-categories/admin-categories.component';
import { AdminProductsComponent } from './pages/admin/admin-products/admin-products.component';



const routes: Routes = [
  {path: 'blog', component: BlogComponent },
  {path: 'menu/:category' , component: ProductsComponent },
  {path: 'admin', component: AdminComponent, children:[
    {path:'', pathMatch:'full', redirectTo:'admin-blog'},
    {path:'admin-category', component: AdminCategoriesComponent},
    {path:'admin-products', component: AdminProductsComponent},
    {path:'admin-blog', component: AdminBlogComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
