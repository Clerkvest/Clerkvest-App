import { LocalService } from 'src/app/service/cookie/local.service';
import { CookieService } from 'ngx-cookie-service';
import { EmployeeService } from 'src/app/service/api/employee.service';
import { Subscription } from 'rxjs';
import { LoginService } from './../../service/api/login.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cookie } from 'src/app/enumeration/cookie.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  token: string;

  constructor(    
    private route: ActivatedRoute,
    private router: Router,
    private localService: LocalService,
    private LoginService: LoginService,
    private employeeService: EmployeeService
  ) { }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token');
    let loginSub: Subscription = this.LoginService.getApiKey(this.token).subscribe(
      response => {
        let employeeSub: Subscription = this.employeeService.getEmployee(response.response).subscribe(
          employee => {
            this.localService.set(Cookie.TOKEN, response.response);
            this.localService.set(Cookie.ID, String(employee.id));

            this.router.navigate(['dashboard']);
          },
          error => {
            console.log(error);
          },
          () => {
            employeeSub.unsubscribe();
          }
        );
      },
      error => {
        console.log(error);
      },
      () => {
        loginSub.unsubscribe();
      }
    );
  }

  ngOnDestroy() {
  }
}
