import { User } from "./UserModel";

export class Center{
    userID:User;
    name:string;
    picture:string;
    city:string;
    rating:number;
    numberRating:number;
    description:string;
    coordinates:number[];
    status:boolean;
    price:number;
constructor(  userID:User,
    name:string,
    picture:string,
    city:string,
    rating:number,
    numberRating:number,
    description:string,
    coordinates:number[],
    status:boolean,
    price:number){
        this.city=city
        this.coordinates=coordinates
        this.description=description
        this.name=name
        this.numberRating=numberRating
        this.picture=picture
        this.price=price
        this.rating=rating
        this.status=status
        this.userID=userID
    }
}
