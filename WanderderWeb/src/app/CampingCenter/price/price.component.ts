import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { CenterPrice } from 'src/app/Models/CenterPrice';
import { PriceItemsService } from 'src/app/Services/CampingCenter/price-items.service';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent implements OnInit {

  show:boolean=false;
  isLoading:boolean;
  priceItems:CenterPrice[];
  deletedItems:string[];
  updatedItems:CenterPrice[]
  updatePrice:FormGroup;
  constructor(private priceService:PriceItemsService) {
   
    this.isLoading=true
    this.priceItems=this.priceService.getItems()
    this.deletedItems=[]
    this.updatedItems=[]
    this.updatePrice=new FormGroup({
      "label":new FormControl('',Validators.required),
      "description":new FormControl('',Validators.required),
      "price":new FormControl('',Validators.required),
      "reserved":new FormControl('',Validators.required),
      "stock":new FormControl('',Validators.required),
    })
    this.priceService.getPrices().subscribe(data=>{
      console.log(data)
      this.isLoading=false
      this.priceItems=data
    })
   }


  ngOnInit(): void {
  }
  toggle():void{
    this.show=!this.show
  }
  deleteItem(itemID:string):void{
    this.deletedItems.push(itemID)
  }
  onSubmit():void{
    if(!this.updatePrice.valid){return;}
    let price=this.updatePrice.get('price')?.value
    let label =this.updatePrice.get('label')?.value
    let description=this.updatePrice.get('description')?.value
    let stock=this.updatePrice.get('stock')?.value
    let reserved=this.updatePrice.get('reserved')?.value

  }
  
}
