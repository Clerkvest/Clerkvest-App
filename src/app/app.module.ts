import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './ui/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigatorComponent } from './component/navigator/navigator.component';
import { InvestmentComponent } from './ui/investment/investment.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavigatorComponent,
    InvestmentComponent,
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
