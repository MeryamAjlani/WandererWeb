import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationServiceService } from 'src/app/Services/authentification-service.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css','./../../../assets/AuthFormStyle.css']
})
export class ResetPasswordComponent implements OnInit {

  isLoading:boolean;
  errorPass:string;
  errorConfirm:string;
     state:string[];
  constructor(private authService:AuthentificationServiceService,private router:Router) { 
    this.isLoading=false;
    this.errorConfirm='';
    this.errorPass='';
    this.state=[]
  }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm):void{
    if(!form.valid) {
      return;
    };
    console.log(form)
    this.isLoading=true
    const confirmation = form.value.confirm
    const password=form.value.password
    if(confirmation!=password){
      this.errorConfirm='Fields don\'t match'
      this.state[1]='is-invalid'
      this.isLoading=false
      return;
    }
    this.authService.setNewPassword(password).subscribe(
      data=>{
        console.log(data)
           this.router.navigate(['/login'])

      },error=>{
       const errorMessages=error.error;
      if(errorMessages.password!=''){
        this.errorPass=errorMessages.password
        this.state[0]='is-invalid'
      }
      if(errorMessages.confirmation!=''){
        this.errorPass=errorMessages.confirmation
        this.state[1]='is-invalid'
      }
      }
    )
    
  }

}
