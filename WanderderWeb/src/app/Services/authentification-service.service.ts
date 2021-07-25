import { Injectable } from '@angular/core';
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

  constructor(private http: HttpClient) { }

  LogIn(email:string, password:string){
    return this.http.post<any>('http://localhost:3000/login',{
      email:email,
      password:password
    })
  }
}
