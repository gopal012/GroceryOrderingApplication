import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { review } from '../Models/review.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  baseApiUrl:string="http://localhost:5017/";
  constructor(private http:HttpClient) { }

  getAllReview(ProductId:string):Observable<review[]>{
    return this.http.get<review[]>(this.baseApiUrl + 'api/ProductReview?productId=' + ProductId)
  }

  addReview(review:review):Observable<review>{
    return this.http.post<review>(this.baseApiUrl + 'api/ProductReview',review)
  }
}
