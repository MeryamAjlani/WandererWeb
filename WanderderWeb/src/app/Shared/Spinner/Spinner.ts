import { Component } from "@angular/core";

@Component({
        selector:'app-spinner',
        template:'<div class="lds-ripple"><div></div><div></div></div>',
        styleUrls:['./Spinner.css']

})
export class Spinner{
    constructor() { }
}