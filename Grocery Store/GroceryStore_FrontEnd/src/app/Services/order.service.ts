import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../Models/Order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseApiUrl:string="http://localhost:5017/";
  constructor(private http:HttpClient) { }

  getAllOrders(UserId:number):Observable<Order[]>{
    return this.http.get<Order[]>(this.baseApiUrl + 'api/Order/' + UserId)
  }

  placeNewOrder(order:Order):Observable<Order>{
    return this.http.post<Order>(this.baseApiUrl + 'api/Order',order)
  }
}
