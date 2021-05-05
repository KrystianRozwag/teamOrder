import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainGuard } from 'src/app/main.guard';
import { DashboardComponent } from '../dashboard.component';
import { RequestsComponent } from '../requests/requests.component';
import { SettingsComponent } from '../settings/settings.component'
import { SummaryComponent } from '../summary/summary.component';

const routes: Routes = [
  {path: '' , component: DashboardComponent, children:[
    {path: 'summary', component: SummaryComponent, canActivate: [MainGuard]},
    {path: 'settings', component: SettingsComponent, canActivate: [MainGuard]},
    {path: 'join_requests', component:RequestsComponent, canActivate: [MainGuard]}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }