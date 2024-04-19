import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './Admin/add-product/add-product.component';
import { EditProductComponent } from './Admin/edit-product/edit-product.component';
import { LoginComponent } from './Anonymous/login/login.component';
import { SignupComponent } from './Anonymous/signup/signup.component';
import { authGuard } from './guards/auth.guard';
import { AdminDashboardComponent } from './Admin/admin-dashboard/admin-dashboard.component';
import { NavbarComponent } from './Anonymous/navbar/navbar.component';
import { AdminNavbarComponent } from './Admin/admin-navbar/admin-navbar.component';
import { UserNavbarComponent } from './SignIn-User/user-navbar/user-navbar.component';
import { ProductDescriptionComponent } from './SignIn-User/product-description/product-description.component';
import { DashboardComponent } from './Shared/dashboard/dashboard.component';
import { adminAuthGuard } from './guards/adminAuth.guard';
import { CartComponent } from './SignIn-User/cart/cart.component';
import { MyOrdersComponent } from './SignIn-User/my-orders/my-orders.component';
import { OrderDetailsComponent } from './SignIn-User/order-details/order-details.component';

const routes: Routes = [
  {
    path:"",
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path:"home",
    component:NavbarComponent,
    children:[
      {
        path:"",
        component:DashboardComponent
      },
      {
        path:'login',
        component:LoginComponent
      },
      {
        path:'signup',
        component:SignupComponent
      },
      {
        path:'description',
        component:ProductDescriptionComponent
      }
    ]
  },
  {
    path:'admin',
    component:AdminNavbarComponent,
    canActivate:[adminAuthGuard],
    children:[
      {
        path:'',
        component:AdminDashboardComponent
      },
      {
        path:'addProduct',
        component:AddProductComponent
      },
      {
        path:'products/edit/:id',
        component:EditProductComponent
      },
      {
        path:'description',
        component:ProductDescriptionComponent
      }
    ]
  },
  {
    path:'user',
    component:UserNavbarComponent,
    canActivate:[authGuard],
    children:[
      {
        path:'',
        component:DashboardComponent
      },
      {
        path:'description',
        component:ProductDescriptionComponent
      },
      {
        path:'cart',
        component:CartComponent
      },
      {
        path:'cart/:id',
        component:CartComponent
      },
      {
        path:'orders',
        component:MyOrdersComponent
      },
      {
        path:'details',
        component:OrderDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = [NavbarComponent,
                                  LoginComponent,
                                  SignupComponent,
                                  AdminNavbarComponent,
                                  AdminDashboardComponent,
                                  AddProductComponent,
                                  EditProductComponent,
                                  UserNavbarComponent,
                                  DashboardComponent,
                                  ProductDescriptionComponent,
                                  CartComponent,
                                  MyOrdersComponent,
                                  OrderDetailsComponent
                                ]
