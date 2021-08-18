import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Spinner } from './Shared/Spinner/Spinner';
import { LoginFormComponent } from './Authentification/login-form/login-form.component';
import { ResetRequestFormComponent } from './Authentification/reset-request-form/reset-request-form.component';
import { ResetPasswordComponent } from './Authentification/reset-password/reset-password.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CenterProfileComponent } from './CampingCenter/center-profile/center-profile.component';
import { SideBarComponent } from './CampingCenter/side-bar/side-bar.component';
import { CenterDetailsComponent } from './CampingCenter/center-details/center-details.component';
import { ReservationComponent } from './CampingCenter/reservation/reservation.component';
import { PriceComponent } from './CampingCenter/price/price.component';
import { CodeInputComponent } from './Authentification/code-input/code-input.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent } from './CampingCenter/center-profile/carousel/carousel.component';
import { ReviewsComponent } from './CampingCenter/reviews/reviews.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { PriceItemComponent } from './CampingCenter/price/price-item/price-item.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { AuthInterceptiorService } from './Services/auth-interceptior.service';
import { RouteGuardGuard } from './Services/route-guard.guard';



@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    ResetRequestFormComponent,
    ResetPasswordComponent,
    Spinner,
    CenterProfileComponent,
    SideBarComponent,
    CenterDetailsComponent,
    ReservationComponent,
    PriceComponent,
    CodeInputComponent,
    CarouselComponent,
    ReviewsComponent,
    PriceItemComponent,

    
  ],
  imports: [
    MatSlideToggleModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    NgbModule,
    MatExpansionModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: '/login' },
      { path: 'login', component: LoginFormComponent ,canActivate:[RouteGuardGuard]},
      { path: 'resetPassword', component: ResetRequestFormComponent,canActivate:[RouteGuardGuard]},
      { path: 'confirmCode', component: CodeInputComponent,canActivate:[RouteGuardGuard]},
      { path: 'newPassword', component: ResetPasswordComponent,canActivate:[RouteGuardGuard]},

      { path: 'centerProfile', component: CenterProfileComponent, canActivate:[RouteGuardGuard],children:[
        {
          path:'details', component:CenterDetailsComponent
        },
        {
          path:'reviews', component:ReviewsComponent
        },
       { path:'reservations', component:ReservationComponent},
       {
         path:'prices',component:PriceComponent
       },
       { path: '', pathMatch: 'full', redirectTo: 'details' }
      ]
    }
    ]),
    
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,useClass:AuthInterceptiorService,multi:true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
