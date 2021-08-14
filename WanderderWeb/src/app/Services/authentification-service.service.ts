import { EventEmitter, Injectable, Output } from '@angular/core';
import {HttpClient} from  '@angular/common/http';
import { User } from '../Models/UserModel';



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
   private email:string;
  constructor(private http: HttpClient) {
    this.email=''
   }

  LogIn(email:string, password:string){
    
    return this.http.post<any>('http://localhost:3000/login',{
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
}
