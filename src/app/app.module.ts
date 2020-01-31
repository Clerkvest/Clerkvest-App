import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './ui/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigatorComponent } from './component/navigator/navigator.component';
import { InvestmentComponent } from './ui/investment/investment.component';
import { LoginComponent } from './ui/login/login.component';
import { Error404Component } from './ui/error/error404/error404.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavigatorComponent,
    InvestmentComponent,
    LoginComponent,
    Error404Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
