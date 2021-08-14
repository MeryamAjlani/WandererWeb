export class CenterReview{
    content:string;
    userId:string;
    rating:number;
    date:string;
    center:string;
    constructor(content:string,userId:string,rating:number,date:string,center:string){
        this.center=center;
        this.content=content
        this.date=date
        this.rating=rating
        this.userId=userId
    }

}