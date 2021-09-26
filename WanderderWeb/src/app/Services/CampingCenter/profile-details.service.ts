import { HttpClient } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Center } from 'src/app/Models/CenterModel';
interface City {
  value: number;
  viewValue: string;
}
@Injectable({
  providedIn: 'root'
})

export class ProfileDetailsService {
  
dataFetched:Subject<boolean>=new Subject<boolean>()
cities:City[];
headerUpdated:Subject<string[]>=new Subject<string[]>()
  constructor(private http:HttpClient) {
    this.cities=[
      {value: 0, viewValue: 'Ariana'},
      {value: 1, viewValue: 'Béja'},
      {value: 2, viewValue: 'Ben Arous'},
      {value: 3, viewValue: 'Bizert'},
      {value: 4, viewValue: 'Gabès'},
      {value: 5, viewValue: 'Gafsa'},
      {value: 6, viewValue: 'Jendouba'},
      {value: 7, viewValue: 'Kairouan'},
      {value: 8, viewValue: 'Kasserine'},
      {value: 9, viewValue: 'Kébili'},
      {value: 10, viewValue: 'Le Kef'},
      {value: 11, viewValue: 'Mahdia'},
      {value: 12, viewValue: 'La Manouba'},
      {value: 13, viewValue: 'Médenine'},
      {value: 14, viewValue: 'Monastir'},
      {value: 15, viewValue: 'Nabeul'},
      {value: 16, viewValue: 'Sfax'},
      {value: 17, viewValue: 'Sidi Bouzid'},
      {value: 18, viewValue: 'Siliana'},
      {value: 19, viewValue: 'Sousse'},
      {value: 20, viewValue: 'Tataouine'},
      {value: 21, viewValue: 'Tozeur'},
      {value: 22, viewValue: 'Tunis'},
      {value: 23, viewValue: 'Zaghrouan'},
    ];
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
  updateHeader(name:string,city:string){

  }
  getHeaderListener():Subject<string[]>{
    return this.headerUpdated
  }
  getCityName(index:number){
let city=this.cities.find(el=>
      el.value==index)
      console.log(city?.viewValue)
      return city?.viewValue
  }
}
