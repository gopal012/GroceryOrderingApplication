import { Injectable } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { Tokens } from '../Models/token.model';

@Injectable({
  providedIn:'root'
})

export class adminAuthGuard{
  info!:Tokens
  token : any = ''

  constructor(private auth:AuthService,private route:Router){}
  
  //Admin Authentication Guard
  canActivate(): boolean{
    this.token = this.auth.getToken();
    this.info = jwt_decode(this.token);
    var role = this.info.role
    if(this.auth.isLoggedIn() && role == 'Admin'){
      return true;
    }
    else if(role != 'Admin'){
        this.route.navigate(['user'])
        return false;
      }
    else{
      this.route.navigate(['login'])
      return false;
    }
  }
};