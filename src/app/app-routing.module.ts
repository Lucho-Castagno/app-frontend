import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { EstacionamientoComponent } from './components/estacionamiento/estacionamiento.component';
import { CuentaComponent } from './components/cuenta/cuenta.component';
import { HistorialComponent } from './components/historial/historial.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "signup", component: SignupComponent},
  { path: "home", component: HomeComponent,
    children: [
      { path: "estacionamiento", component: EstacionamientoComponent },
      { path: "cuenta", component: CuentaComponent },
      { path: "historial", component: HistorialComponent },
      { path: "", redirectTo: "estacionamiento", pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
