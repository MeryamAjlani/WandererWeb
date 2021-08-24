import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthentificationServiceService } from './authentification-service.service';

@Injectable()
export class AuthInterceptiorService implements HttpInterceptor{

  constructor(private authService:AuthentificationServiceService) {
   
   }
   intercept(req:HttpRequest<any>,next:HttpHandler){
     const token = this.authService.getToken()
  if(token){
    console.log(token)
    const authRequest =req.clone({
      headers:req.headers.set('authorization','Bearer '+token)
    })
    
    return next.handle(authRequest)
  }
  else{
    return next.handle(req)
  }
   }
}
