import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Center } from 'src/app/Models/CenterModel';
import { CenterPrice } from 'src/app/Models/CenterPrice';
import { PriceItemsService } from 'src/app/Services/CampingCenter/price-items.service';

export type NewItem =Omit<CenterPrice,'_id'>
@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
 
export class PriceComponent implements OnInit {
 
  accessPrice:FormGroup;
  show:boolean=false;
  isLoading:boolean;
  isEmpty:boolean;
  priceItems:CenterPrice[];
  priceItemsCopy:CenterPrice[]
  deletedItems:string[];
  addedItems:NewItem[];
  encapsulation: ViewEncapsulation.None = 2;
  updatedItems:CenterPrice[]
  addPrice:FormGroup;
  constructor(private modalService: NgbModal,private priceService:PriceItemsService,private router:Router) {
    this.isEmpty=false
    this.isLoading=true
    this.priceItems=this.priceService.getItems()
    this.deletedItems=[]
    this.addedItems=[]
    this.updatedItems=[]
    this.priceItemsCopy=this.priceItems
    this.addPrice=new FormGroup({
      "label":new FormControl('',Validators.required),
      "description":new FormControl(''),
      "price":new FormControl('',Validators.required),
      "stock":new FormControl(''),
    })
    this.accessPrice=new FormGroup({
      "price":new FormControl(localStorage.getItem('price'),Validators.required)
    })
    this.priceService.getPrices().subscribe(data=>{
      console.log(data)
      this.isLoading=false
      if(Object.keys(data).length === 0){
        this.isEmpty=true
      }
      this.priceItems=data
      this.priceItemsCopy=data
      
    })
   }


  ngOnInit(): void {
    this.priceService.getAddedListener().subscribe(data=>{
      this.priceItems.push(data)
    })
    this.priceService.getRestoreListener().subscribe(data=>{
      this.isLoading=false
     
      this.priceItems=this.priceItemsCopy
    })
    this.priceService.getUpdatedListener().subscribe(data=>{
      
      let found = this.updatedItems.find(el=>{
        el._id==data._id        
      })
      if(found){
        this.updatedItems.splice(this.updatedItems.indexOf(found),1)
       
      }
      this.updatedItems.push(data)
      console.log(this.updatedItems)
    })
    this.priceService.getDeletedListener().subscribe(data=>{
     this.deleteItem(data)
    })

  }
  
  deleteItem(itemID:string):void{
   let found= this.deletedItems.find(el=>el==itemID)
  
   if(!found)
    {
     
      this.deletedItems.push(itemID)}
  }

submitChange(){
  this.isLoading=true
  console.log(this.deletedItems)
  this.priceService.updatePrices(this.updatedItems,this.deletedItems,this.addedItems,this.accessPrice.get('price')?.value).subscribe(
   data=>{
  this.priceItems=[...this.addedItems,...this.priceItems] as CenterPrice[]
  this.priceItems=this.priceItems.filter(item => this.deletedItems.indexOf(item._id) < 0);
  this.isLoading=false
  this.addedItems=[]
  this.deletedItems=[]
  this.updatedItems=[]
  }
  )
}
openVerticallyCentered(content:any) {
  this.modalService.open(content, { centered: true });
}
onSubmit(){
  if(!this.addPrice.valid) {
    return;}
  let price=+this.addPrice.get('price')?.value
    let label =this.addPrice.get('label')?.value
    let description=this.addPrice.get('description')?.value
    let stock=+this.addPrice.get('stock')?.value
    let reserved=+this.addPrice.get('reserved')?.value
    let center=localStorage.getItem('center')
    let newItem:NewItem={
      label:label,
      description:description,
      reservedStock:reserved,
      totalStock:stock,
      center:center||'',
      price:price
    }
    this.addedItems.push(newItem)
    this.modalService.dismissAll()
}
restoreValues(){
  window.location.reload();

}
}
