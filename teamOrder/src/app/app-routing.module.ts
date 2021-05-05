import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainScreenComponent } from './features/main-screen/main-screen.component'
import { FirstTimeComponent } from './features/first-time/first-time.component'
import { HaveCodeComponent } from './features/have-code/have-code.component'
import { LoginComponent } from './features/auth_services/login/login.component'
import { SignupComponent } from './features/auth_services/signup/signup.component'
import { MainGuard } from './main.guard';


const routes: Routes = [
  {path: '' , component: MainScreenComponent},
  {path: 'first-time', component: FirstTimeComponent},
  {path: 'have-code', component: HaveCodeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'dashboard', loadChildren: './features/dashboard/dashboard/dashboard.module#DashboardModule', canActivate: [MainGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
