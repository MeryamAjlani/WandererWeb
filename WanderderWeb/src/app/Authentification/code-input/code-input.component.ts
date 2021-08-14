import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthentificationServiceService } from 'src/app/Services/authentification-service.service';

@Component({
  selector: 'app-code-input',
  templateUrl: './code-input.component.html',
  styleUrls: ['./code-input.component.css','./../../../assets/AuthFormStyle.css']
})
export class CodeInputComponent implements OnInit {
  isLoading:boolean;
  errorCode:string;
  state:string;
  constructor(private authService:AuthentificationServiceService,private router:Router,private _Activatedroute:ActivatedRoute) { 
    this.isLoading=false;
    this.errorCode="";
    this.state="";
  }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    if(!form.valid) {
      return;
    };
    this.isLoading=true
    const code=form.value.code
    var email=this.authService.getEmail()
    this.authService.confirmCode(email,code).subscribe(
      data=>{
        console.log(data)
        this.isLoading=false
        this.router.navigate(['/newPassword'])
      },error=>{
        this.state='is-invalid'
        this.isLoading=false
      this.errorCode= 'Invalid Code';
      }
    )
  }

}
