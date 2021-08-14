import { transformAll } from '@angular/compiler/src/render3/r3_ast';
import { Component, getPlatform, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationServiceService } from 'src/app/Services/authentification-service.service';



@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css','./../../../assets/AuthFormStyle.css']
})
export class LoginFormComponent implements OnInit {

  isLoading: boolean
  errorEmail:string;
  errorPassword:string;
  state:string[];
  constructor(private authService:AuthentificationServiceService,private router:Router) {
    this.isLoading=false;
    this.errorEmail='';
    this.errorPassword=''
    this.state=[];
   }
   resetErrorField(){
    this.errorEmail=''
    this.errorPassword=''
  
   }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm):void{
    this.resetErrorField()
    if(!form.valid) {
      return;
    };
    this.isLoading=true
    const email=form.value.email
    const password=form.value.password
    this.authService.LogIn(email,password).subscribe(
      data=>{
        console.log(data.status)
        this.isLoading=false
       if(data.user){
        switch(data.user.role){
          case 1:{
            
            this.router.navigate(['/OrganisationProfile'])
            break
          }
          case 2:{
            this.router.navigate(['/centerProfile/centerDetails'])
            break
          }
          case 0:{
            this.errorEmail='No such email !'
           this.state[0]='is-invalid'
            break
          }
        }
        
       }
      },error=>{
        const errorMessage=error.error
        this.isLoading=false
        switch(error.status){
          case 404:
            this.errorEmail= errorMessage.email
            this.state[0]='is-invalid'
            break;
          case 406:
         
            this.errorPassword= 'Invalid Combination';
            this.state[1]='is-invalid'
            break
          case 412:
            this.errorEmail= errorMessage.email
            this.errorPassword= errorMessage.pass 
            this.state[0]='is-invalid'
            this.state[1]='is-invalid'

        }
      
      }
    )
    
  }

}
