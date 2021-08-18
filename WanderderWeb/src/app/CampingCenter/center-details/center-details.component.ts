import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-center-details',
  templateUrl: './center-details.component.html',
  styleUrls: ['./center-details.component.css']
})
export class CenterDetailsComponent implements OnInit {
  isLoading:boolean;
  updateCenter:FormGroup;
  status:boolean;
  constructor() { 
    this.status=true
    this.isLoading=false;
    this.updateCenter=new FormGroup({
      /*1-initial value, 2- validators,3-async validators*/ 
      "centerName":new FormControl("initial value",Validators.required),
      "status": new FormControl('open',Validators.required),
      "description": new FormControl('miaoaoiaojkvejghrk',[Validators.required]),
      "address":new FormControl('jazjhfjrf',Validators.required),
      "city":new FormControl("ariana",Validators.required),
      "lat":new FormControl("kozorezaerr",Validators.required),
      "long":new FormControl("zaerazeregze",Validators.required),
      "email":new FormControl("'jiqhfjk@mioa.com",[Validators.required,Validators.email]),
      "password":new FormControl(null,[Validators.required,Validators.minLength(8)]),
      "confirm":new FormControl(null,[Validators.required,Validators.minLength(8)])


    })
  }

  ngOnInit(): void {
   
  }
onSubmit():void{}
}
