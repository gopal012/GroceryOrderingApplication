import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent implements OnInit {
  username:string='';
  userId:number=0;
  constructor(private authService:AuthService,
              private route:ActivatedRoute,
              private router:Router){}
              
  ngOnInit(): void {
    this.route.queryParams.subscribe((params)=>{
      this.userId = params['id'];
      this.username = params['name'];
    })
  }

  SignOut(){
    this.authService.logout();
  }

  viewCart(){
    this.router.navigate(['/user/cart'],{queryParams:{id:this.userId,name:this.username}})
  }

  home(){
    this.router.navigate(['user'],{queryParams:{id:this.userId,name:this.username}});
  }

  vieworders(){
    this.router.navigate(['/user/orders'],{queryParams:{id:this.userId,name:this.username}});
  }
}
