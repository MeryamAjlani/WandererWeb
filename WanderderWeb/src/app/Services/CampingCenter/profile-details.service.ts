import { HttpClient } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Center } from 'src/app/Models/CenterModel';

@Injectable({
  providedIn: 'root'
})
export class ProfileDetailsService {
dataFetched:Subject<boolean>=new Subject<boolean>()
  constructor(private http:HttpClient) {
  
   }
   dataFecthedFromServer(){
     this.dataFetched.next(true)
   }
   getDataListener():Subject<boolean>{
     return this.dataFetched
   }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }
  getProfileDetails(){
   return this.http.get<{profile:Center}>('http://localhost:3000/center/getCampingCenter/0')
  }
  updateCenterProfile(name:string,description:string,status:boolean,city:string,address:string){
    return this.http.post('http://localhost:3000/center/updateCenter',{
      'name':name,
      'description':description,
      'status':status,
      'city':city,
      'streetAdress':address

    })
  }
  
}
