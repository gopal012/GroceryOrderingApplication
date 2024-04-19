import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Product } from 'src/app/Models/product.model';
import { AuthService } from 'src/app/Services/auth.service';
import { ProductService } from 'src/app/Services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{
  products:Product[]=[];
  filterProducts:Product[]=[];
  page:number=1;
  searchKey:string=''
  categoryValue:string=''
  order:Boolean=true
  IsDesc:Boolean=true

  constructor(private productService:ProductService,
              private route:Router,
              private authService:AuthService,
              private toast:NgToastService){}

  ngOnInit(): void {
    this.productList();
  }

  //Admin Signout
  SignOut(){
    this.authService.logout();
  }

  //Function to show All products list
  productList(){
    this.productService.getAllProducts().subscribe({ 
      next:(products)=>{
       this.products = products;
       this.filterProducts = products;
      },
      error:(res)=>{
       console.log(res);
      }
   })
  }

  //On Deleting Product
  OnDelete(id:string){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(id).subscribe({
          next:(res)=>{
            this.toast.success({detail:"Success", summary:"Product Deleted", duration:5000})
            this.productList();
          },
          error:(res)=>{
            this.toast.error({detail:"Something Went Wrong", summary:"Try Again Later !!!", duration:5000})
          }
        });
      }
    })
  }

  //Category Selection Function
  selectCategory(){
      this.filterProducts = this.products.filter((a:any)=>{
        if(a.category.toLowerCase() == this.categoryValue.toLowerCase() || this.categoryValue == ''){
          return a;
        }
      })
  }

  sortName(){
    this.IsDesc = !this.IsDesc

    let direction = this.IsDesc?1:-1;

    this.products.sort(function(a,b){
      if(a.productName<b.productName){
        return -1*direction;
      }
      else if(a.productName>b.productName){
        return 1*direction;
      }
      else{
        return 0;
      }
    })
  }

  sortPrice(){
    if(this.order){
      let newarr = this.products.sort((a,b)=>a.price-b.price);
      this.products = newarr
    }
    else{
      let newarr = this.products.sort((a,b)=>b.price-a.price);
      this.products = newarr
    }

    this.order = !this.order
  }

}
