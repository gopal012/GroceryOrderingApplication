import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../Models/product.model';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  productDetails:Product={
    id:'',
    productName:'',
    description: '',
    category: '',
    quantity: 0,
    imageUrl: '',
    price: 0,
    discount: 0,
    specification: ''
  }

  constructor(private route:ActivatedRoute,
              private productService:ProductService,
              private router:Router,
              private toast:NgToastService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next:(params)=>{
        const id = params.get('id');
        if(id){
           this.productService.getProduct(id).subscribe({
            next: (res)=>{
              this.productDetails = res;
            }
           });
        }
      }
    })
  }

  //When Product got Edited
  OnSubmit(){
     this.productService.updateProduct(this.productDetails.id,this.productDetails).subscribe({
      next:(res)=>{
        this.toast.success({detail:"Success", summary:"Product Edited", duration:5000})
        this.productService.getAllProducts();
        this.router.navigate(['admin']);
      },
      error:(res)=>{
        console.log(res);
        this.toast.error({detail:"Error, Something Went Wrong", summary:"Try Again Later !!!", duration:5000})
       }
     })
  }

}
