import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainScreenComponent } from './features/main-screen/main-screen.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FirstTimeComponent, DialogData } from './features/first-time/first-time.component';
import { HaveCodeComponent } from './features/have-code/have-code.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LoginComponent } from './features/auth_services/login/login.component';
import { SignupComponent } from './features/auth_services/signup/signup.component';
import { DashboardModule } from '../app/features/dashboard/dashboard/dashboard.module';
import { RequestsComponent } from './features/dashboard/requests/requests.component';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    MainScreenComponent,
    FirstTimeComponent,
    HaveCodeComponent,
    DashboardComponent,
    LoginComponent,
    SignupComponent,
    RequestsComponent,
    DialogData
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardModule,
    HttpClientModule,
    MatDialogModule,
    ClipboardModule,
    MatTooltipModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
