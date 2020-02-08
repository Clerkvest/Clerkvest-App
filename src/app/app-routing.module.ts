import { UpdateComponent } from './ui/update/update.component';
import { CreateComponent } from './ui/create/create.component';
import { Error404Component } from './ui/error/error404/error404.component';
import { LoginComponent } from './ui/login/login.component';
import { InvestmentComponent } from './ui/investment/investment.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './ui/dashboard/dashboard.component';


const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'app', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'investment/:id', component: InvestmentComponent},
  {path: 'create', component: CreateComponent},
  {path: 'update/:id', component: UpdateComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', component: Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
