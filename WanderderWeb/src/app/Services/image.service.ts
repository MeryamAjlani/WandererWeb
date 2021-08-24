import { Injectable } from '@angular/core';
import { Cloudinary, CloudinaryImage } from '@cloudinary/base';
import { format } from '@cloudinary/base/actions/delivery';
import { png } from '@cloudinary/base/qualifiers/format';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  cld:Cloudinary;
  constructor() {
    this.cld = new Cloudinary({
      cloud: {
        cloudName: 'wanderer31',
        apiKey:'999749756638474',
        apiSecret:'6jgeEde82rQedRNBuYnTQ4r9Rto' 
        
      }
    }); 
   }
   getImageByUrl(imageUrl:string):string{
     return this.cld.image(imageUrl).toURL()
   }
}
