import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/Services/cart.service';
import { cart } from 'src/app/Models/Cart.model';
import { ProductService } from 'src/app/Services/product.service';
import { Product } from 'src/app/Models/product.model';
import { OrderService } from 'src/app/Services/order.service';
import { Order } from 'src/app/Models/Order.model';
import { OrderDetail } from 'src/app/Models/OrderDetail.modal';
import { OrderDetailsService } from 'src/app/Services/order-details.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  userId: number = 0;
  userName: string = '';
  orderList!:Order[]

  constructor(private route: ActivatedRoute,
              private router: Router,
              private order: OrderService
  ) { }

  ngOnInit(): void {
    //Accessing Parameters
    this.route.queryParams.subscribe((params) => {
      this.userId = params['id'];
      this.userName = params['name']
    })
    this.getAllOrders();
  }

  getAllOrders(){
    this.order.getAllOrders(this.userId).subscribe({
      next:(res)=>{
        this.orderList = res;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  //When user don't have ordered anything
  orderNow() {
    this.router.navigate(['/user'], { queryParams: { id: this.userId, name: this.userName } })
  }

  details(orderId:string){
    this.router.navigate(['/user/details'],{ queryParams: { id: this.userId, name: this.userName,orderid:orderId } })
  }

}
