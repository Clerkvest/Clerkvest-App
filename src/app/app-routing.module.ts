import { CompanyComponent } from './ui/company/company.component';
import { ProfileComponent } from './ui/profile/profile.component';
import { CreateComponent } from './ui/create/create.component';
import { Error404Component } from './ui/error/error404/error404.component';
import { LoginComponent } from './ui/login/login.component';
import { InvestmentComponent } from './ui/investment/investment.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './ui/dashboard/dashboard.component';


const routes: Routes = [
  {path: 'project/:id', component: InvestmentComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'create', component: CreateComponent},
  {path: 'myself', component: ProfileComponent},
  {path: 'company', component: CompanyComponent},
  {path: 'login/:token', component: LoginComponent},
  {path: 'app', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: '**', component: Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
