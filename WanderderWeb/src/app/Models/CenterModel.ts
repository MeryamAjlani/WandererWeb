import { User } from "./UserModel";

export class Center{

    _id:string;
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
    streetAdress:string;
constructor( 
    address:string,
     _id:string,userID:User,
    name:string,
    picture:string,
    city:string,
    rating:number,
    numberRating:number,
    description:string,
    coordinates:number[],
    status:boolean,
    price:number){
        this.streetAdress=address
        this._id=_id
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
