import { Component, OnInit } from '@angular/core';
import { Product } from '../../Models/product.model';
import { ProductService } from '../../Services/product.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  addProduct : Product ={
    id:'',
    productName:'',
    description: '',
    category: '',
    quantity: 0,
    imageUrl: '',
    price: 0,
    discount: 0,
    specification: ''
    
  };

  constructor(private productService:ProductService,
              private route:Router,
              private toast:NgToastService
              ){}
  
  ngOnInit(): void {
  }

  //Adding New Product
  OnSubmit(){
    this.addProduct.id='00000000-0000-0000-0000-000000000000';
    this.productService.addProduct(this.addProduct).subscribe({
      next: (res)=>{
        this.toast.success({detail:"Success", summary:"Product Added Successfully", duration:5000})
        this.route.navigate(['/admin']);
        this.productService.getAllProducts();
      },
      error:(err)=>{
        console.log(err);
        this.toast.error({detail:"Something Went Wrong", summary:"Try Again Later !!!", duration:5000})
       }
    });
  }
}
