import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/Models/product.model';
import { OrderDetailsService } from 'src/app/Services/order-details.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  userId: number = 0;
  userName: string = '';
  orderId:string='';
  productList:Product[]=[]
  totalValue:number=0

  constructor(private route: ActivatedRoute,
              private router: Router,
              private orderDetail:OrderDetailsService,
              private product:ProductService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.userId = params['id'];
      this.userName = params['name']
      this.orderId = params['orderid']
    })
    this.orderDetail.getOrderDetail(this.orderId).subscribe({
      next:(res)=>{
        console.log(res);
        res.forEach((a)=>{
          this.product.getProduct(a.productId).subscribe({
            next:(resp)=>{
              resp.quantity = a.quantity
              this.totalValue += a.quantity*(resp.price-(resp.discount*resp.price)/100)
              this.productList.push(resp);
            }
          })
        })
        this.totalValue.toFixed(2);
      },
      error:(err)=>{
        console.log(err);
      }
    })

  }
}
