import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthentificationServiceService } from './authentification-service.service';

@Injectable()
export class AuthInterceptiorService implements HttpInterceptor{

  constructor(private authService:AuthentificationServiceService) {
   
   }
   intercept(req:HttpRequest<any>,next:HttpHandler){
     const token = this.authService.getToken()
     const authRequest =req.clone({
       headers:req.headers.set('authorization',token)
     })
     return next.handle(authRequest)
   }
}
