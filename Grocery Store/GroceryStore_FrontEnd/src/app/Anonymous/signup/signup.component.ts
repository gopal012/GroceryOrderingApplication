import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { matchPassword } from './matchPassword.validator';
import { AuthService } from '../../Services/auth.service';
import { Observable } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  public signUpForm !:FormGroup
  constructor(private formBuilder:FormBuilder,
              private http:HttpClient,
              private router:Router,
              private authService:AuthService,
              private toast:NgToastService){}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      id:[0],
      fullName:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      phoneNumber:['',[Validators.required,Validators.pattern("^[0-9]{10}$"),Validators.minLength(10), Validators.maxLength(10)]],
      password:['',[Validators.required, Validators.minLength(8)]],
      confirmPassword:['',[Validators.required,Validators.minLength(8)]],
      isAdmin:[false],
      role:['User'],
      Token:['']
    },
    {
      validators:matchPassword    //Compare password and Confirm Password
    })
  }

  signUp(){
    if(this.signUpForm.valid){
      this.authService.signup(this.signUpForm.value).subscribe({
      next:(res=>{
        this.toast.success({detail:"Success", summary:"User Signup Completed", duration:5000})
        this.signUpForm.reset();
        this.router.navigate(['/home/login']);
      }),
      error:(err=>{
        console.log(err.message);
        if(err.error.message == 'User Already exists !'){
          this.toast.warning({detail:"Email Id Already Exists", summary:"Try With Another EmailId !!!", duration:5000})
        }
        else{
          this.toast.error({detail:"Something Went Wrong", summary:"Try Again Later !!!", duration:5000})
        }
      })
    });

    }

}
}
