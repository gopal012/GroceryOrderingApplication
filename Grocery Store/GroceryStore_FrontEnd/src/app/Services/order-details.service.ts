import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDetail } from '../Models/OrderDetail.modal';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {

  baseApiUrl:string="http://localhost:5017/";
  constructor(private http:HttpClient) { }

  getOrderDetail(orderId:string):Observable<OrderDetail[]>{
    return this.http.get<OrderDetail[]>(this.baseApiUrl + 'api/OrderDetails/' + orderId)
  }

  addOrderDetail(orderdetail:OrderDetail):Observable<OrderDetail>{
    return this.http.post<OrderDetail>(this.baseApiUrl + 'api/OrderDetails', orderdetail)
  }
}
