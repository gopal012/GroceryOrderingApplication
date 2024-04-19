import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Product } from '../Models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService { 

  baseApiUrl:string="http://localhost:5017/";
  
  constructor(private http:HttpClient) { }

  getAllProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseApiUrl + 'api/Product')
  }

  addProduct(product:Product):Observable<Product>{
    return this.http.post<Product>(this.baseApiUrl + 'api/Product', product)
  }

  getProduct(id:string):Observable<Product>{
    return this.http.get<Product>(this.baseApiUrl + 'api/Product/' + id)
  }

  updateProduct(id:string,product:Product):Observable<Product>{
    return this.http.put<Product>(this.baseApiUrl + 'api/Product/' + id,product)
  }

  deleteProduct(id:string):Observable<Product>{
    return this.http.delete<Product>(this.baseApiUrl + 'api/Product/' + id);
  }
}
