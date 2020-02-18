import { Subscription } from 'rxjs';
import { LoginService } from './../../service/api/login.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
    private LoginService: LoginService,
  ) { }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token');

    let sub: Subscription = this.LoginService.getApiKey(this.token).subscribe(
      ret => {
        console.log(ret);
      },
      error => {
        console.log(error);
      },
      () => {
        sub.unsubscribe();
      }
    );
  }

  ngOnDestroy() {
  }
}
