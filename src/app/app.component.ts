import { LocalService } from './service/cookie/local.service';
import { Cookie } from './enumeration/cookie.enum';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Clerkvest-App';

  constructor(private local:LocalService){
    this.local.set(Cookie.TOKEN, 'exampleToken0');
    this.local.set(Cookie.ID, '2');
  }
}
