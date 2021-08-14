import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent implements OnInit {
  panelOpenState:boolean;
  show:boolean=false;
  constructor() {
    this.panelOpenState=false
   }

  ngOnInit(): void {
  }
  toggle():void{
    this.show=!this.show
  }
  deleteItem():void{}
}
