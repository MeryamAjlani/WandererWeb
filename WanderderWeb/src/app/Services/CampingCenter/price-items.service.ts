import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NewItem } from 'src/app/CampingCenter/price/price.component';
import { Center } from 'src/app/Models/CenterModel';
import { CenterPrice } from 'src/app/Models/CenterPrice';

@Injectable({
  providedIn: 'root'
})
export class PriceItemsService {
priceItems:CenterPrice[];
private deletedItems:Subject<string>;
private UpdatedItems:Subject<CenterPrice>;
private restoreItem:Subject<boolean>
private addedItem:Subject<CenterPrice>
  constructor(private http:HttpClient) { 
    this.priceItems=[ ]
    this.UpdatedItems=new Subject<CenterPrice>()
    this.deletedItems=new Subject<string>()
    this.restoreItem=new Subject<boolean>()
    this.addedItem=new Subject<CenterPrice>()
  }
  getItems():CenterPrice[]{
    return this.priceItems
  }
  getPrices(){
  return  this.http.post<CenterPrice[]>('http://localhost:3000/center/getCamingCenterPrices',{
      center:localStorage.getItem('center')
    })
  }

  getUpdatedListener(){
    return this.UpdatedItems
  }
  getDeletedListener()
{
  return this.deletedItems
}
updatePrices(items:CenterPrice[],deleted:string[],addedItems:NewItem[],price:number){
  
  return this.http.post('http://localhost:3000/center/updatePrices',{
    modItems:items,
    delItems:deleted,
    newItems:addedItems,
    accessPrice:price
  })
}

getRestoreListener():Subject<boolean>{
  return this.restoreItem
}
getAddedListener():Subject<CenterPrice>{
  return this.addedItem
}
}
