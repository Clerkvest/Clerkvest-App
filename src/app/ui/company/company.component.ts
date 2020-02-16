import { ImageService } from './../../service/api/image.service';
import { LocalService } from 'src/app/service/cookie/local.service';
import { EmployeeService } from './../../service/api/employee.service';
import { Observable, Subscription } from 'rxjs';
import { CompanyService } from './../../service/api/company.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICompany, IEmployee } from 'src/app/model/models';
import { Cookie } from 'src/app/enumeration/cookie.enum';
import { isNullOrUndefined } from 'util';

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
   * Image to upload
   */
  fileToUpload: File;

  /**
   * Error string
   */
  errorString: string;

  /**
   * Has loaded state. True if page has loaded everything
   */
  hasLoaded: boolean = false;

  /**
   * Has updated state. True if company got updated successfully
   */
  hasUpdated: boolean;

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
    private imageService: ImageService
  ) { }

  /**
   * Initializes all required observables and variables
   */
  ngOnInit() {
    this.myselfSub = this.employeeService.getEmployeeById(this.localService.getAsInteger(Cookie.ID)).subscribe(myself => {
      this.myself = myself;
      this.companySub = this.companyService.getCompanyById(myself.companyId).subscribe(company => {
        this.company = company;
        this.hasLoaded = true;
      });
    });
  }

  /**
   * Unsubscribes all subscriptions
   */
  ngOnDestroy(): void {
    this.companySub.unsubscribe();
    this.myselfSub.unsubscribe();
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
   * File change event
   * @param files Files to update. Takes the first only
   */
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  /**
   * Sends the API calls to update a company
   */
  public fire() {
    let sub: Subscription = this.companyService.updateCompany(this.company).subscribe(
      ret => {
        this.hasUpdated = true;
        console.log(ret);
        
        if(!isNullOrUndefined(this.fileToUpload)) {
          let imageSub: Subscription = this.imageService.createCompanyImageUsingPOST(this.fileToUpload, this.company.id)
            .subscribe(
              imgRet => {

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
}
