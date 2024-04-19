import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/Models/product.model';
import { AuthService } from 'src/app/Services/auth.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  products:Product[]=[];
  filterProducts:Product[]=[];
  categoryValue:string=''
  searchKey:string=''
  page:number=1;
  userId:number=0
  userName:string=''
  order:Boolean=true
  IsDesc:Boolean=true

  constructor(private authService:AuthService,
              private productService:ProductService,
              private router:ActivatedRoute
              ){}

  ngOnInit(): void {
    this.router.queryParams.subscribe((params)=>{
      this.userId = params['id'];
      this.userName = params['name']
    })
    this.productList();
  }

  //Getting All List of Products
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

  SignOut(){
    this.authService.logout();
  }

  //Category selection Method
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
