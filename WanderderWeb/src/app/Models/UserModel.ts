export class User{
    email: string;
    password: string;
    fullname: string;
    role:number;
    profile:string;

    constructor(email:string,password:string,fullname:string,role:number,profile:string){
        this.email=email;
        this.password=password;
        this.fullname=fullname;
        this.role=role;
        this.profile=profile;
    }
}