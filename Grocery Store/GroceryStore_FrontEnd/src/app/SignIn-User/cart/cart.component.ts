import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { cart } from 'src/app/Models/Cart.model';
import { Order } from 'src/app/Models/Order.model';
import { OrderDetail } from 'src/app/Models/OrderDetail.modal';
import { Product } from 'src/app/Models/product.model';
import { CartService } from 'src/app/Services/cart.service';
import { OrderDetailsService } from 'src/app/Services/order-details.service';
import { OrderService } from 'src/app/Services/order.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  productList:Product[]=[];
  length:number = 0;
  quantity:number=0
  price:number=0;
  userName:string=''
  userId:number=0
  item:cart={
    userId:0,
    productId:'',
    quantity:0
  }
  dummyCart:cart
  ={
    userId:0,
    productId:'',
    quantity:0
  }
  cartQuantities:number[]=[]

  orderItem: cart[] = []
  newOrderId:string='';
  newOrder: Order = {
    orderId: '00000000-0000-0000-0000-000000000000',
    userId: 0,
    totalItems: 0
  }
  orderList!:Order[]
  orderDetail:OrderDetail={
    id:0,
    productId:'',
    quantity:0,
    orderId:''
  }
  product!: Product
  totalValue:number=0
  
  constructor(private route:ActivatedRoute,
              private productService:ProductService,
              private cartService:CartService,
              private router:Router,
              private toast:NgToastService,
              private order: OrderService,
              private orderDetails:OrderDetailsService){}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params)=>{
      this.userId = parseInt(params['id']);
      this.userName = (params['name']);
      this.item.userId = parseInt(params['id']);
      this.item.productId = params['productId'];
      this.item.quantity = parseInt(params['items']);
    })
    this.getAll();
  }

  getAll(){
    this.cartService.getAllItemsFromCart(this.userId).subscribe({
      next:(res)=>{
        if(res != null){
          res.forEach((a)=>{
            this.dummyCart = a
            const id = this.dummyCart.productId
            if(id){
              this.productService.getProduct(id).subscribe({
                next:(resp)=>{
                  resp.quantity = a.quantity;
                  this.totalValue += a.quantity*(resp.price-(resp.discount*resp.price)/100)
                  this.length = this.productList.push(resp);
                },
                error:(err)=>{
                  console.log(err);
                }
              })
            }
          })
          this.totalValue.toFixed(2);
        }
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  //When user increases quantity of product
  plus(id:string,productQuantity:number){
    this.item.productId = id;
    this.item.quantity = ++productQuantity
    this.cartService.updateItemFromCart(this.item).subscribe({
      next:(res)=>{
        console.log(res);
        this.productList = [];
        this.getAll();
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  //When user decreases quantity of product
  minus(id:string,productQuantity:number){
    --productQuantity
    if(productQuantity == 0){
      this.cartService.deleteItemFromCart(id,this.userId).subscribe({
        next:(res)=>{
          console.log(res);
          this.productList = [];
          this.getAll();
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
    else{
      this.item.productId = id;
      this.item.quantity = productQuantity
      this.cartService.updateItemFromCart(this.item).subscribe({
        next:(res)=>{
          console.log(res);
          this.productList = [];
          this.getAll();
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
  }

  //When user places new order
  orrder(){
    this.cartService.getAllItemsFromCart(this.userId).subscribe({
      next: (res) => {
        this.orderItem = res
        //placing new order
        this.newOrder.totalItems = this.orderItem.length;
        this.newOrder.userId = this.userId
        this.order.placeNewOrder(this.newOrder).subscribe({
          next: (res) => {
            this.newOrderId = res.orderId
            this.orderItem.forEach((a) => {
              this.orderDetail.orderId = this.newOrderId;
              this.orderDetail.productId = a.productId;
              this.orderDetail.quantity = a.quantity
              this.orderDetails.addOrderDetail(this.orderDetail).subscribe({
                next:(res)=>{
                  console.log(res);
                },
                error:(err)=>{
                  console.log(err);
                }
              })
              
              
              this.productService.getProduct(a.productId).subscribe({
                next: (res) => {
                  this.product = res;
                  this.product.quantity = this.product.quantity - a.quantity;
                  this.productService.updateProduct(this.product.id, this.product).subscribe({
                    next: (res) => {
                      console.log(res);
                    },
                    error: (err) => {
                      console.log(err);
                    }
                  })
                }
              })
              this.cartService.deleteItemFromCart(a.productId, a.userId).subscribe({
                next: (res) => {
                  console.log(res);
                },
                error: (err) => {
                  console.log(err);
                }
              })
            })
            this.toast.success({detail:"Success", summary:"Order Placed", duration:5000})
            this.router.navigate(['/user/orders'],{queryParams:{id:this.userId,name:this.userName}})
          },
          error: (err) => {
            console.log(err);
          }
        })
      },
      error: (err) => {
        console.log(err);
      }
    })

  }

  //When user don't have added anything to cart
  orderNow(){
    this.router.navigate(['/user'],{queryParams:{id:this.userId,name:this.userName}})
  }

  AddMoreItem(){
    this.router.navigate(['/user'],{queryParams:{id:this.userId,name:this.userName}})
  }

  emptyCart(){
    this.cartService.getAllItemsFromCart(this.userId).subscribe({
      next:(res)=>{
        res.forEach((a)=>{
          this.cartService.deleteItemFromCart(a.productId,a.userId).subscribe({
            next:(res)=>{
              console.log(res);
            },
            error:(err)=>{
              console.log(err);
            }
          })
        })
        this.productList = []
        this.length = 0
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

}
