import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Center } from 'src/app/Models/CenterModel';
import { ProfileDetailsService } from 'src/app/Services/CampingCenter/profile-details.service';


interface City {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-center-details',
  templateUrl: './center-details.component.html',
  styleUrls: ['./center-details.component.css']
})

export class CenterDetailsComponent implements OnInit {
  isLoading:boolean;
 
  updateCenter:FormGroup;
  status:boolean;
  center?:Center;
  cities:City[];
  constructor(private profileservice:ProfileDetailsService) { 
    this.status=true
    this.isLoading=true;
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
    this.updateCenter=new FormGroup({
      
      /*1-initial value, 2- validators,3-async validators*/ 
      "centerName":new FormControl('',Validators.required),
      "status": new FormControl(status,Validators.required),
      "description": new FormControl('',[Validators.required]),
      "address":new FormControl('',Validators.required),
      "city":new FormControl(0,Validators.required),
     /* "lat":new FormControl('',Validators.required),
      "long":new FormControl('',Validators.required),
   */


    })
  }

  ngOnInit(): void {
    this.profileservice.getProfileDetails().subscribe(respnse=>{
      console.log(respnse)
     if(respnse){
  
       this.isLoading=false
       localStorage.setItem('center',respnse.profile._id)
      this.center=respnse.profile
      localStorage.setItem("price",''+respnse.profile.price)
      localStorage.setItem("cover",respnse.profile.picture)
      localStorage.setItem("rating",respnse.profile.rating.toString())
      localStorage.setItem("city",respnse.profile.city)
      localStorage.setItem("name",respnse.profile.name)
      this.profileservice.dataFecthedFromServer()
      this.setForm(this.center)
     }
      
     else return
    },error=>{
      
      console.log(error)
    })
    
  }

setForm(center:Center){
  this.status=center.status
  this.updateCenter.patchValue({'centerName':center.name,
'status':center.status,
'description':center.description,
'address':center.streetAdress,
'city':center.city,
/*'lat':center.coordinates[0],
'long':center.coordinates[1]*/})
}
submitChanges(){
  if(!this.updateCenter.valid) {
    return; 
    
  };
  this.isLoading=true
  const name=this.updateCenter.get('centerName')?.value 
  const status=this.updateCenter.get('status')?.value
  const description=this.updateCenter.get('description')?.value
  const city=this.updateCenter.get('city')?.value
  const address=this.updateCenter.get('address')?.value
  this.profileservice.updateCenterProfile(name,description,status,city,address).subscribe(data=>{

    this.profileservice.getHeaderListener().next([name,city])
    console.log(data)
    this.isLoading=false
  },err=>{
    this.isLoading=false
  })
}
changeCity(e:any) {
  this.updateCenter.setValue(e.target.value, {
    onlySelf: true
  })
}
}
