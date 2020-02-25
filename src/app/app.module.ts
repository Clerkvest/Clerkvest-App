import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { APIS } from './service/api/api';
import { CookieService } from 'ngx-cookie-service';
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
import { ApiModule } from './service/api.module';
import { CreateComponent } from './ui/create/create.component';
import { ProfileComponent } from './ui/profile/profile.component';
import { CompanyComponent } from './ui/company/company.component';
import { DragDropDirective } from './directive/drag-drop.directive';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavigatorComponent,
    InvestmentComponent,
    LoginComponent,
    Error404Component,
    CreateComponent,
    ProfileComponent,
    CompanyComponent,
    DragDropDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ApiModule
  ],
  providers: [
    CookieService,
    HttpClient,
    APIS
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
