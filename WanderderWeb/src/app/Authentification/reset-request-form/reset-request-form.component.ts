import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationServiceService } from 'src/app/Services/authentification-service.service';

@Component({
  selector: 'app-reset-request-form',
  templateUrl: './reset-request-form.component.html',
  styleUrls: ['./reset-request-form.component.css','./../../../assets/AuthFormStyle.css']
})
export class ResetRequestFormComponent implements OnInit {
  isLoading:boolean;
  errorEmail:String;
  state:String;

  constructor(private authService:AuthentificationServiceService,private router:Router) { 
    this.isLoading=false;
    this.errorEmail='';
    this.state="";
  }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm):void{
    if(!form.valid) {
      return;
    };
    this.isLoading=true
    const email=form.value.email
    const password=form.value.password
    this.authService.resetRequest(email).subscribe(
      data=>{
        this.isLoading=false
        this.authService.getEmail()
         this.router.navigate(['/confirmCode'])
      },error=>{
        this.state="is-invalid"
        const errorMessage=error.error
        this.isLoading=false
        this.errorEmail=errorMessage.email      
      }
    )
    
  }
}
