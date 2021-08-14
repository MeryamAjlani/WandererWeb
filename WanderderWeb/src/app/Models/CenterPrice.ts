
export class CenterPrice{
    label:string;
    description:string;
    price:number;
    center:string;
    totalStock:number;
    reservedStock:number;

    constructor(label:string,description:string,price:number,center:string,totalStock:number,reservedStock:number){
        this.center=center
        this.description=description
        this.label=label
        this.reservedStock=reservedStock
        this.totalStock=totalStock
        this.price=price
    }
}