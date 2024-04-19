import { Injectable } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { Tokens } from '../Models/token.model';

@Injectable({
  providedIn:'root'
})

export class authGuard{
  info!:Tokens
  token : any = ''
  constructor(private auth:AuthService,private route:Router){}
  
  //User Authentication Guard
  canActivate(): boolean{
    this.token = this.auth.getToken();
    this.info = jwt_decode(this.token);
    var role = this.info.role
    if(this.auth.isLoggedIn() && role == 'User'){
      return true;
    }
    else if(role != 'User'){
      this.route.navigate(['admin'])
      return false;
    }
    else{
      this.route.navigate(['login'])
      return false;
    }
  }
};
