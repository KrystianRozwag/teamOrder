import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryComponent } from '../summary/summary.component';
import { SettingsComponent } from '../settings/settings.component';
import {DashboardRoutingModule} from '../dashboard/dashboard-routing.module';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    SummaryComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ClipboardModule,
    MatTooltipModule,
    MatButtonModule
  ]
})
export class DashboardModule { }
