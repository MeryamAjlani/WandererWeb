import { transformAll } from '@angular/compiler/src/render3/r3_ast';
import { Component, getPlatform, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationServiceService } from 'src/app/Services/authentification-service.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  isLoading: boolean
  stateEmail:string;
  statePassword:string;
  errorEmail:string;
  errorPassword:string;
  constructor(private authService:AuthentificationServiceService,private router:Router) {
    this.isLoading=false;
    this.errorEmail='';
    this.errorPassword=''
    this.stateEmail=''
    this.statePassword=''
   }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm):void{
    this.errorEmail=''
    this.errorPassword=''
    this.stateEmail=''
    this.statePassword=''
    if(!form.valid) return;
    this.isLoading=true
    const email=form.value.email
    const password=form.value.password
    this.authService.LogIn(email,password).subscribe(
      data=>{
        this.isLoading=false
       if(data.status){
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
            this.stateEmail='is-invalid'
            break
          }
        }
        
       }
       else{
         if(data.email!=""){
          this.errorEmail=data.email
          this.stateEmail='is-invalid'
         }
         if(data.pass!=""){
          this.errorPassword=data.pass
          this.statePassword='is-invalid'
         }
         
      }
      },error=>{
        console.log(error)
      }
    )
    
  }

}
