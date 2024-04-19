import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { cart } from '../Models/Cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseApiUrl:string="http://localhost:5017/";
  constructor(private http:HttpClient) { }

  getAllItemsFromCart(UserId:number):Observable<cart[]>{
    return this.http.get<cart[]>(this.baseApiUrl + 'api/Cart/' + UserId)
  }

  getItemFromCart(UserId:number,ProductId:string):Observable<cart>{
    return this.http.get<cart>(this.baseApiUrl + 'api/Cart/' + UserId + '/' + ProductId)
  }

  addItemToCart(cart:cart):Observable<cart>{
    return this.http.post<cart>(this.baseApiUrl + 'api/Cart',cart)
  }

  updateItemFromCart(cart:cart):Observable<cart>{
    return this.http.put<cart>(this.baseApiUrl + 'api/Cart', cart)
  }

  deleteItemFromCart(productId:string,userId:number):Observable<cart>{
    return this.http.delete<cart>(this.baseApiUrl + 'api/Cart/'+userId+'/'+productId)
  }
}
