import { EventEmitter, Injectable, Output } from '@angular/core';
import {HttpClient} from  '@angular/common/http';
import { User } from '../Models/UserModel';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';



interface UserReturnInterface{
  user: User,

  status: boolean
}
interface ErrorInterface{
  emailError:string,
  passwordError:string
}
@Injectable({
  providedIn: 'root'
})

export class AuthentificationServiceService {
  private token!:string;
   private email:string;
   private authStatusListener=new Subject<boolean>()
  constructor(private http: HttpClient,private router:Router) {
    this.email=''
    this.token=''
   }

  LogIn(email:string, password:string){
    
    return  this.http.post<any>('http://localhost:3000/login',{
      email:email,
      password:password
    })
  }

  resetRequest(email:string){
    this.email=email 
    return this.http.post<any>('http://localhost:3000/resetPassword',{
      email:email,
     
    })
  }
  confirmCode(email:string,code:string){
    console.log(email+code)
    return this.http.post<any>('http://localhost:3000/confirmCode',{
      email:email,
      code:code
    })
  }
  setNewPassword(password:string){
    console.log(this.email+password)
    return this.http.post<any>('http://localhost:3000/changePassword',{
      email:this.email,
      pass:password
    })
  }
  getEmail(): string{ 
    return this.email
  }
  setToken(token:string){this.token=token}
  getToken(){
    return this.token
  }
  getStatusListener(){
    return this.authStatusListener.asObservable()
  }
  isAuthenticated(){
    this.authStatusListener.next(true)
    
  }
  isNotAuthenticated(){
    this.authStatusListener.next(false)
   
  }
  saveAuthData(token:string,email:string){
    localStorage.setItem('token',token)
    localStorage.setItem('email',email)
  }
  clearAuthData(){
    localStorage.removeItem('token')
  }
  autoAuthUser(){
    const token=localStorage.getItem('token')
    if(!token) this.router.navigate(['/'])
    else{
      this.router.navigate(['/centerProfile/details'])
    }
  }
  logOut(){
    this.token=''
    this.authStatusListener.next(false)
    this.clearAuthData()
    this.router.navigate(['/'])
  }
}
