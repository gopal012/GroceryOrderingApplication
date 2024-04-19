import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  public loginForm !:FormGroup
  resetPasswordEmail!:string
  isValidEmail!:boolean

  constructor(private formBuilder:FormBuilder,
              private router:Router,
              private authService:AuthService,
              private toast:NgToastService){}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]]
    })
  }

  onLogin(){
  if(this.loginForm.valid){
    this.authService.login(this.loginForm.value).subscribe({
      next:(res=>{
        this.authService.storeToken(res.token);
        if(res.isAdmin){
          this.toast.success({detail:"Hello " + res.fullName, summary:"Login Success", duration:5000})
          this.loginForm.reset();
          this.router.navigate(['admin']);
        }
        else{
          this.toast.success({detail:"Hello " + res.fullName, summary:"Login Success", duration:5000})
          this.router.navigate(['user'],{queryParams:{id:res.id,name:res.fullName}});
          this.loginForm.reset();
        }
      }),
      error:(err=>{
        console.log(err);
        this.toast.error({detail:"Login Failed", summary:"Invalid Credentials", duration:5000}) 
      })
    })
  }
}

  checkValidEmail(event:string){
    const value = event;
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
    this.isValidEmail = pattern.test(value);
    return this.isValidEmail
  }

  confirmToSend(){
    if(this.checkValidEmail(this.resetPasswordEmail)){
      console.log(this.resetPasswordEmail)
      this.resetPasswordEmail = '';
      const buttonRef = document.getElementById('closeBtn');
      buttonRef?.click();
      this.toast.success({detail:"Success", summary:"Reset Link Sent to the Email", duration:5000})
    }
  }
}
