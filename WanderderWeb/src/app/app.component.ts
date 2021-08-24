import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animation';
import { AuthentificationServiceService } from './Services/authentification-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',],
  /*animations: [
    slideInAnimation
    // animation triggers go here
  ]*/
})
export class AppComponent implements OnInit{
  title = 'WanderderWeb';
  constructor(private authService:AuthentificationServiceService){}
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
  ngOnInit(){
    this.authService.autoAuthUser()
  }
}
