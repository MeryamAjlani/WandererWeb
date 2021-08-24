import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CenterPrice } from 'src/app/Models/CenterPrice';

@Component({
  selector: 'app-price-item',
  templateUrl: './price-item.component.html',
  styleUrls: ['./price-item.component.css']
})
export class PriceItemComponent implements OnInit {

  @Input() item:CenterPrice;
  panelOpenState:boolean; 
  updatePrice:FormGroup;
  isDeleted:boolean;
  show:boolean=false;
  constructor() {
    this.isDeleted=false
    this.panelOpenState=false
    this.updatePrice=new FormGroup({
    "label":new FormControl('',Validators.required),
    "description":new FormControl('',Validators.required),
    "price":new FormControl('',Validators.required),
    "reserved":new FormControl('',Validators.required),
    "stock":new FormControl('',Validators.required),
  })
   }

  ngOnInit(): void {
    this.updatePrice.patchValue({
      'label':this.item.label,
      'description':this.item.description,
      'price':this.item.price,
      'reserved':this.item.reservedStock,
      'stock':this.item.totalStock

    })
  }
  toggle():void{
    this.show=!this.show
  }
  deleteItem(itemID:string):void{
    
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
