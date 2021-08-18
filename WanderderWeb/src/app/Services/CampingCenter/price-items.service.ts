import { Injectable } from '@angular/core';
import { Center } from 'src/app/Models/CenterModel';
import { CenterPrice } from 'src/app/Models/CenterPrice';

@Injectable({
  providedIn: 'root'
})
export class PriceItemsService {
priceItems:CenterPrice[];
  constructor() { 
    this.priceItems=[new CenterPrice("eeee",'miao',"miao caramel",50,"dddd",5,5),
    new CenterPrice("eeee",'miao',"miao caramel",50,"dddd",5,5),
    new CenterPrice("eeee",'miao',"miao caramel",50,"dddd",5,5),
    new CenterPrice("eeee",'miao',"miao caramel",50,"dddd",5,5),
    new CenterPrice("eeee",'miao',"miao caramel",50,"dddd",5,5),
    
  ]
  }
  getItems():CenterPrice[]{
    return this.priceItems
  }
}
