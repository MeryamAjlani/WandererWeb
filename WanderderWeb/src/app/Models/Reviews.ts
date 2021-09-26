import { ImageService } from "../Services/image.service";

export class CenterReview{
    content:string;
    name:string;
    rating:number;
    date:string;
    img:string
    constructor(content:string,name:string,rating:number,date:string,img:string){ 
        this.content=content
        this.date=date.substring(0,10)
        this.rating=rating
        this.name=name
        this.img=img
    }

}