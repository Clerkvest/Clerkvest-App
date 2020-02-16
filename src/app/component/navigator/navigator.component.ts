import { Subscription, Observable } from 'rxjs';
import { Cookie } from './../../enumeration/cookie.enum';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from 'src/app/service/cookie/local.service';
import { EmployeeService } from 'src/app/service/api/employee.service';
import { IEmployee } from 'src/app/model/IEmployee';

/**
 * @author Danny B.
 * 
 * Navbar logic
 * 
 * @since 1.0
 * @version 1.0
 */
@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit, OnDestroy {
  /**
   * Observable to store the current employee logged in.
   */
  public employee$: Observable<IEmployee>;

  /**
   * Employee subscription
   */
  public employeeSub: Subscription;

  /**
   * EmployeeId
   */
  private employee: IEmployee;

  /**
   * Creates an instance of NavigatorComponent
   * @param router Router to route between sites
   * @param localService Handes cookies
   * @param EmployeeService  Employee api calls
   */
  constructor(private router: Router, private localService: LocalService, private EmployeeService: EmployeeService) { }

  /**
   * Initializes all required observables
   */
  ngOnInit() {
    this.employee$ = this.EmployeeService.getEmployeeById(this.localService.getAsInteger(Cookie.ID));
  }

  /**
   * Unsubscribes all subscriptions
   */
  ngOnDestroy(): void {
    this.employeeSub.unsubscribe();
  }

  /**
   * Opens the dashboard
   */
  openDashboard(): void {
    this.router.navigate(['dashboard']);
  }

  /**
   * Opens the profile
   */
  openProfile(): void {
    this.router.navigate(['myself']);
  }

  /**
   * Opens the company
   */
  openCompany(): void {
    this.router.navigate(['company']);
  }

  /**
   * Logs the current user out.
   */
  logout(): void {
    this.localService.delete(Cookie.ID);
    this.localService.delete(Cookie.TOKEN);

    window.location.href = 'http://clerkvest.com';
  }
}