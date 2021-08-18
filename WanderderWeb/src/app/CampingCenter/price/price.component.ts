import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CenterPrice } from 'src/app/Models/CenterPrice';
import { PriceItemsService } from 'src/app/Services/CampingCenter/price-items.service';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent implements OnInit {
  panelOpenState:boolean;
  show:boolean=false;
  isLoading:boolean;
  isDeleted:boolean;
  priceItems:CenterPrice[];
  deletedItems:string[];
  updatedItems:CenterPrice[]
  constructor(private priceService:PriceItemsService) {
    this.isDeleted=false
    this.panelOpenState=false
    this.isLoading=false
    this.priceItems=this.priceService.getItems()
    this.deletedItems=[]
    this.updatedItems=[]
   }


  ngOnInit(): void {
  }
  toggle():void{
    this.show=!this.show
  }
  deleteItem(itemID:string):void{
    this.deletedItems.push(itemID)
  }
  onSubmit(form:NgForm):void{}
}
