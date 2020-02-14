import { LocalService } from './../../service/cookie/local.service';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IEmployee } from 'src/app/model/models';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/service/api/api';
import { DomSanitizer } from '@angular/platform-browser';
import { Cookie } from 'src/app/enumeration/cookie.enum';

/**
 * @author Danny B.
 * 
 * @since 1.0
 * @version 1.0
 */
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  /**
   * Observable of the current user logged in
   */ 
  myself$: Observable<IEmployee>;

  /**
   * Object of the current user logged in
   */ 
  myself: IEmployee;

  /**
   * Sub
   */
  myselfSub: Subscription;

  /**
   * Error string
   */
  errorString: string;

  /**
   * True if everything is loaded
   */
  hasLoaded: boolean = false;

  /**
   * True if profile got updated
   */
  hasUpdated: boolean;

  //bools
  isFirstnameThere: boolean = true;
  isLastnameThere: boolean = true;
  isNicknameThere: boolean = true;

  /**
   * Creates an instance of ProfileComponent
   * @param router Router
   * @param employeeService EmployeeService
   * @param sanitizer Sanitizer
   */
  constructor(    
    private router: Router,
    private localService: LocalService,
    private employeeService: EmployeeService,
    private sanitizer: DomSanitizer
  ) { }

  /**
   * Initializes all required observables
   */
  ngOnInit() {
    this.myself$ = this.employeeService.getEmployeeById(this.localService.getAsInteger(Cookie.ID));

    this.myselfSub = this.myself$.subscribe(myself => {
      this.myself = myself;
      this.hasLoaded = true;
    });
  }
  
  /**
   * Unsubscribes all subscriptions
   */
  ngOnDestroy() {
    this.myselfSub.unsubscribe();
  }

  /**
   * Sets the inputs values into the buffer object
   * @param event The event
   */
  public focusoutHandler(event) {
    switch (event.target.id) {
      case 'inputFirstname': 
        this.myself.firstname = event.target.value;
        if (this.myself.firstname.length == 0) {
          this.isFirstnameThere = false;
        } else {
          this.isFirstnameThere = true;
        }
        break;
      case 'inputLastname': 
        this.myself.lastname = event.target.value;
        if (this.myself.lastname.length == 0) {
          this.isLastnameThere = false;
        } else {
          this.isLastnameThere = true;
        }
        break;
      case 'inputNickname': 
        this.myself.nickname = event.target.value;
        if (this.myself.nickname.length == 0) {
          this.isNicknameThere = false;
        } else {
          this.isNicknameThere = true;
        }
        break;
      }
  }

  /**
   * Sends the API calls to update a profile
   */
  public fire() {
    console.log(this.myself);
    this.employeeService.updateEmployee(this.myself).subscribe(
      ret => {
        console.log(ret);
        this.hasUpdated = true;
      }, 
      error => {
        this.errorString = error.status + " " + error.error.error
        this.hasUpdated = false;
      }
    );
  }
}
