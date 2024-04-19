import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BaseUrl:string = "http://localhost:5017/api/User/"

  constructor(private http:HttpClient) { }

  signup(userObj:any):Observable<any>{
    return this.http.post<any>(`${this.BaseUrl}Register`,userObj)
  }
  
  login(loginObj:any):Observable<any>{
    return this.http.post<any>(`${this.BaseUrl}Authenticate`,loginObj)
  }

  logout(){
    localStorage.clear();
  }

  storeToken(tokenValue:string):void{
    localStorage.setItem('token',tokenValue);
  }

  getToken(){
    return localStorage.getItem('token')
  }

  isLoggedIn():boolean{
    return !!localStorage.getItem('token')
  }
}
