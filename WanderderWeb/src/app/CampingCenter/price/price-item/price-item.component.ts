import { animate, group, query, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CenterPrice } from 'src/app/Models/CenterPrice';
import { PriceItemsService } from 'src/app/Services/CampingCenter/price-items.service';


@Component({
  selector: 'app-price-item',
  templateUrl: './price-item.component.html',
  styleUrls: ['./price-item.component.css'],
  animations: [
    trigger('animImageSlider', [
      state('show', style({
        opacity: 1
      })),
      state('hide',   style({
        opacity: 0
      })),
      transition('show => hide', animate('600ms ease-out')),
      transition('hide => show', animate('600ms ease-in'))
    ]),
  ]
})
export class PriceItemComponent implements OnInit {

  @Input()  item:CenterPrice;
  panelOpenState:boolean; 
  updatePrice:FormGroup;
  isDeleted:string;
  updatedItem:CenterPrice;
  isRestored:String;
  constructor(private priceService:PriceItemsService) {
    this.item=new CenterPrice('','','',0,'',0,0)
    this.updatedItem=this.item
    this.isDeleted='show'
    this.isRestored='hide'
    this.panelOpenState=false
    this.updatePrice=new FormGroup({
    "label":new FormControl(null,Validators.required),
    "description":new FormControl(null),
    "price":new FormControl(null,Validators.required),
    "reserved":new FormControl(null),
    "stock":new FormControl(null),
  })
   }

  ngOnInit(): void {
    this.updatedItem=this.item
    this.priceService.getRestoreListener().subscribe(data=>
    {  if(data) {
      console.log(this.item)
     
      this.restoreValues()
     }}
      )
    this.priceService.getDeletedListener().subscribe(
      data=>{
       
      }
    )
   this.patchValues(this.updatedItem)
  }
  toggle():void{
    this.panelOpenState=!this.panelOpenState
  }
  deleteItem():void{
    this.isRestored='show'
    this.isDeleted='hide'
    this.priceService.getDeletedListener().next(this.item._id)
    
  }
  onSubmit():void{
    if(!this.updatePrice.valid){
     
      return;}
      this.toggle()
    let price=this.updatePrice.get('price')?.value
    let label =this.updatePrice.get('label')?.value
    let description=this.updatePrice.get('description')?.value
    let stock=this.updatePrice.get('stock')?.value
    let reserved=this.updatePrice.get('reserved')?.value
    
    this.updatedItem.description=description
    this.updatedItem.label=label
    this.updatedItem.price=+price
    this.updatedItem.totalStock=+stock
    this.updatedItem.reservedStock=+reserved
    this.updatedItem._id=this.item._id
    this.updatedItem.center=this.item.center
    console.log('after submit')
    console.log(this.item)
    this.priceService.getUpdatedListener().next(this.updatedItem)
   
  }
  restoreValues(){
    this.updatedItem=this.item
   this.patchValues(this.item)
   
  }
  patchValues(item:CenterPrice){
    this.updatePrice.patchValue({
      'label':this.item.label,
      'description':this.item.description,
      'price':this.item.price,
      'reserved':this.item.reservedStock,
      'stock':this.item.totalStock
     
    })
  }
  restoreItem(){
    this.isDeleted='show'
    this.isRestored='hide'
  }
}
