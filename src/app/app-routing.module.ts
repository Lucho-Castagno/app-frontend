import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ParkingComponent } from './components/parking/parking.component';
import { AccountComponent } from './components/account/account.component';
import { MovementsComponent } from './components/movements/movements.component';
import { SignupComponent } from './components/signup/signup.component';
import { authenticationGuard } from './helpers/authentication.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: "", component: LoginComponent }, 
  { path: "signup", component: SignupComponent},
  { path: "home", component: HomeComponent, canActivate: [authenticationGuard],
    children: [
      { path: "parking", component: ParkingComponent },
      { path: "account", component: AccountComponent },
      { path: "movements", component: MovementsComponent },
      { path: "", redirectTo: "parking", pathMatch: 'full' }
    ]
  },
  { path: "**", pathMatch: 'full', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
