import { ImageService } from './../../service/api/image.service';
import { LocalService } from 'src/app/service/cookie/local.service';
import { EmployeeService } from './../../service/api/employee.service';
import { Observable, Subscription } from 'rxjs';
import { CompanyService } from './../../service/api/company.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICompany, IEmployee } from 'src/app/model/models';
import { Cookie } from 'src/app/enumeration/cookie.enum';
import { isNullOrUndefined } from 'util';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

/**
 * @author Danny B.
 * 
 * @since 1.0
 * @version 1.0
 */
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit, OnDestroy {

  /**
   * Company observable
   */
  company$: Observable<ICompany>;

  /**
   * Company object
   */
  company: ICompany;

  /**
   * Company sub
   */
  companySub: Subscription;

  /**
   * Myself observable
   */
  myself$: Observable<IEmployee>;

  /**
   * Myself object
   */
  myself: IEmployee;

  /**
   * Myself sub
   */
  myselfSub: Subscription;

  /**
   * Employee array
   */
  employees$: Observable<Array<IEmployee>>;

  /**
   * Sub
   */
  employeesSub: Subscription;

  /**
   * Sum of balance
   */
  sumOfBalance: number = 0;

  /**
   * Image url
   */
  safeUrl: SafeUrl;

  /**
   * Image to upload
   */
  fileToUpload: File;

  /**
   * Image Sub
   */
  image$: Observable<string>;

  /**
   * Email to invite
   */
  inviteEmail: string;

  /**
   * Error string
   */
  errorString: string;
  errorStringInvite: string;

  /**
   * Has loaded state. True if page has loaded everything
   */
  hasLoaded: boolean = false;

  /**
   * Has updated state. True if company got updated successfully
   */
  hasUpdated: boolean;
  hasInvited: boolean;

  //bools
  isNameThere: boolean;
  isDomainThere: boolean;
  isAmountThere: boolean;
  isDayThere: boolean;

  /**
   * Creates an instance of CompanyComponent
   * @param companyService Company API
   */
  constructor(
    private localService: LocalService,
    private employeeService: EmployeeService,
    private companyService: CompanyService,
    private imageService: ImageService,
    private sanitizer: DomSanitizer
  ) { }

  /**
   * Initializes all required observables and variables
   */
  ngOnInit() {
    this.myselfSub = this.employeeService.getEmployeeById(this.localService.getAsInteger(Cookie.ID)).subscribe(myself => {
      this.myself = myself;
      this.companySub = this.companyService.getCompanyById(myself.companyId).subscribe(company => {
        this.company = company;

        if(!isNullOrUndefined(this.company.image)) {
          this.image$ = this.imageService.getImageUsingGET(this.company.image);
        }

        this.employees$ = this.employeeService.getAllEmployeesUsingGET();
        this.employeesSub = this.employees$.subscribe(
          employees => {
            employees.forEach(employee => {
              console.log(employee)
              this.sumOfBalance += employee.balance;
            });

            this.hasLoaded = true;
          }
        );
      });
    });
  }

  /**
   * Unsubscribes all subscriptions
   */
  ngOnDestroy(): void {
    this.companySub.unsubscribe();
    this.myselfSub.unsubscribe();
    this.employeesSub.unsubscribe();
  }

  /**
   * Sets the inputs values into the buffer object
   * @param event The event
   */
  public focusoutHandler(event) {
    switch (event.target.id) {
      case 'inputName': 
        this.company.name = event.target.value;
        if (this.company.name.length == 0) {
          this.isNameThere = false;
        } else {
          this.isNameThere = true;
        }
        break;
      case 'inputDomain': 
        this.company.domain = event.target.value;
        if (this.company.domain.length == 0) {
          this.isDomainThere = false;
        } else {
          this.isDomainThere = true;
        }
        break;
      case 'inputAmount': 
        this.company.payAmount = event.target.value;
        if (this.company.payAmount <= 0) {
          this.isAmountThere = false;
        } else {
          this.isAmountThere = true;
        }
        break;
      case 'inputPayoutDay': 
        this.company.payInterval = event.target.value;
        if (this.company.payInterval <= 0 || this.company.payInterval >= 31) {
          this.isDayThere = false;
        } else {
          this.isDayThere = true;
        }
        break;
    }
  }

    /**
   * Sets the inputs values into the buffer object
   * @param event The event
   */
  public focusoutHandlerInvite(event) {
    this.inviteEmail = event.target.value;
  }

  /**
   * File change event
   * @param files Files to update. Takes the first only
   */
  onDrop(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  /**
   * Delete the file
   */
  deleteFile() {
    this.fileToUpload = null;
  }

  /**
   * Converts a string to a valid base64 string html can handle
   * @param image Image to convert
   */
  convertToBase64(image: string) {
    return this.sanitizer.bypassSecurityTrustUrl("data:image/jpeg;base64," + image);
  }

  /**
   * Sends the API calls to update a company
   */
  public saveSettings() {
    let sub: Subscription = this.companyService.updateCompany(this.company).subscribe(
      ret => {
        this.hasUpdated = true;
        console.log(ret);
        
        if(!isNullOrUndefined(this.fileToUpload)) {
          let imageSub: Subscription = this.imageService.createCompanyImageUsingPOST(this.fileToUpload, this.company.id)
            .subscribe(
              imgRet => {
                window.location.reload();
              },
              error => {
                this.hasUpdated = false;
                this.errorString = "Upload error: " + error.status + " " + error.error.error;
              },
              () => {
                imageSub.unsubscribe();
              }
            );
        }
      },
      error => {
        this.hasUpdated = false;
        this.errorString = error.status + " " + error.error.error;
      },
      () => {
        sub.unsubscribe();
      }
    );
  }

  public invite() {
    if(this.inviteEmail.length == 0) {
      this.hasInvited = false;
      this.errorStringInvite = "Email cannot be empty";
      return;
    }

    // TODO: API Call if there
  }
}
