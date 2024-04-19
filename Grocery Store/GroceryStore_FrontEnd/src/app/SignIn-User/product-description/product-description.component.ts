import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { cart } from 'src/app/Models/Cart.model';
import { review } from 'src/app/Models/review.model';
import { Product } from 'src/app/Models/product.model';
import { AuthService } from 'src/app/Services/auth.service';
import { CartService } from 'src/app/Services/cart.service';
import { ProductService } from 'src/app/Services/product.service';
import { ReviewsService } from 'src/app/Services/reviews.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.css']
})
export class ProductDescriptionComponent implements OnInit {
  product !:Product
  productname!:string
  price!:number
  discount!:number
  imageurl :string=''
  sellprice :number=0;
  pquantity!:number
  quantity:number=1;
  item:cart={
    userId:0,
    productId:'',
    quantity:0
  }
  user_Id:number=0
  user_Name:string=''
  product_Id:string=''
  reviewString:string=''
  productReviews!:review[]
  productReview:review={
    userId:0,
    userName:'',
    productId:'',
    review:''
  }
  returnValue:string='false'
  ratingControl=new FormControl(0);
  ratingCount:number=0;
  totalRating:number=0;
  finalRating:any=0;

  constructor(private route:ActivatedRoute,
              private productService:ProductService,
              private auth:AuthService,
              private router:Router,
              private toast:NgToastService,
              private cartService:CartService,
              private review:ReviewsService){}
              
  ngOnInit(): void {
    this.route.queryParamMap.subscribe({
      next:(params)=>{
        const userName = params.get('name')
        if(userName){
          this.user_Name = userName
        }
        const userId = params.get('id')
        if(userId){
          this.user_Id = parseInt(userId);
        }
        const id = params.get('productId');
        if(id){
          this.product_Id = id
          this.getAllReviews();
        }
        if(id){
          this.productService.getProduct(id).subscribe({
            next:(res=>{
              this.product = res;
              this.productname = this.product.productName
              this.price = this.product.price
              this.discount = this.product.discount
              this.imageurl = this.product.imageUrl
              this.pquantity = this.product.quantity
              this.sellprice = this.product.price-(this.product.discount*this.product.price)/100
              this.sellprice.toFixed(2);
            })
          })
          this.checkItem();
        }
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  //When product added to cart
  addToCart(){
      if(this.auth.isLoggedIn()){
        this.item.productId = this.product.id;
        this.item.userId = this.user_Id
        this.item.quantity = this.quantity
        this.cartService.addItemToCart(this.item).subscribe({
          next:(res)=>{
            this.router.navigate(['/user/cart'],{queryParams:{productId:this.product.id,items:this.quantity,id:this.user_Id,name:this.user_Name}});
          },
          error:(err)=>{
            console.log(err);
          }
        })
      }
      else{
        this.router.navigate(['/home/login']);
        this.toast.warning({detail:"To Add Items In Cart", summary:"Login First", duration:5000})
      }

    }

    GoToCart(){
      this.router.navigate(['/user/cart'],{queryParams:{id:this.user_Id,name:this.user_Name}});
    }

  //When user increases quantity of product
  plus(){
    this.item.productId = this.product.id;
    this.item.userId = this.user_Id
    this.item.quantity = ++this.quantity
    this.cartService.updateItemFromCart(this.item).subscribe({
      next:(res)=>{
        console.log(res);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  //When user decreases quantity of product
  minus(){
    if(this.quantity == 1){
      this.cartService.deleteItemFromCart(this.product_Id,this.user_Id).subscribe({
        next:(res)=>{
          console.log(res);
          this.returnValue = 'false'
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
    else{
      this.item.userId = this.user_Id
      this.item.productId = this.product_Id;
      this.item.quantity = --this.quantity
      this.cartService.updateItemFromCart(this.item).subscribe({
        next:(res)=>{
          console.log(res);
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
  }

  //Getting All review for Product 
  getAllReviews(){
    this.review.getAllReview(this.product_Id).subscribe({
      next:(res)=>{
        this.productReviews = res
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  //Adding review for the product
  AddReview(){
    if(this.auth.isLoggedIn()){
      this.productReview.productId = this.product_Id
      this.productReview.userId = this.user_Id
      this.productReview.userName = this.user_Name
      this.productReview.review = this.reviewString
      this.review.addReview(this.productReview).subscribe({
        next:(res)=>{
          console.log(res);
          this.toast.success({detail:"Success", summary:"Review Added", duration:5000})
          this.getAllReviews();
          
        },
        error:(err)=>{
          console.log(err);
          this.toast.error({detail:"Something went Wrong", summary:"Try Again Later !!", duration:5000})
        }
      })
    }
    else{
      this.router.navigate(['/home/login']);
      this.toast.warning({detail:"To Add Review", summary:"Login First", duration:5000})
    }
  }

  checkItem(){
    this.cartService.getItemFromCart(this.user_Id,this.product_Id).subscribe({
      next:(res)=>{
        if(res != null){
          this.returnValue = 'true'
          this.quantity = res.quantity
        }
        else{
          this.returnValue = 'false'
        }
      }
    })
  }

  getRating(){
    this.ratingCount++;
    this.totalRating += this.ratingControl?.value || 0;
    this.finalRating = (this.totalRating/this.ratingCount).toFixed(2);
  }

}
