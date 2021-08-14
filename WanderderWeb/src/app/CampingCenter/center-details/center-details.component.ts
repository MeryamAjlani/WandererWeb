import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-center-details',
  templateUrl: './center-details.component.html',
  styleUrls: ['./center-details.component.css']
})
export class CenterDetailsComponent implements OnInit {
  isLoading:boolean;
  constructor() { 
    this.isLoading=false;
  }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm){

  }
}
