import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CodeInputComponent } from './Authentification/code-input/code-input.component';
import { LoginFormComponent } from './Authentification/login-form/login-form.component';
import { ResetPasswordComponent } from './Authentification/reset-password/reset-password.component';
import { ResetRequestFormComponent } from './Authentification/reset-request-form/reset-request-form.component';
import { CenterDetailsComponent } from './CampingCenter/center-details/center-details.component';
import { CenterProfileComponent } from './CampingCenter/center-profile/center-profile.component';
import { PriceComponent } from './CampingCenter/price/price.component';
import { ReservationComponent } from './CampingCenter/reservation/reservation.component';
import { ReviewsComponent } from './CampingCenter/reviews/reviews.component';
import { RouteGuardGuard } from './Services/route-guard.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginFormComponent },
  { path: 'resetPassword', component: ResetRequestFormComponent},
  { path: 'confirmCode', component: CodeInputComponent},
  { path: 'newPassword', component: ResetPasswordComponent},

  { path: 'centerProfile', component: CenterProfileComponent, canActivate:[RouteGuardGuard],children:[
    {
      path:'details', component:CenterDetailsComponent
    },
    {
      path:'reviews', component:ReviewsComponent
    },
   { path:'reservations/:index', component:ReservationComponent},
   {
     path:'prices',component:PriceComponent
   },
 
   { path:'m', component:ReservationComponent},
],
  }]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
