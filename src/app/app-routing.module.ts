import { InvestmentComponent } from './ui/investment/investment.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from "./ui/dashboard/dashboard.component";


const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'investment/:id', component: InvestmentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
