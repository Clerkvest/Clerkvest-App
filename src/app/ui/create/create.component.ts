import { Cookie } from './../../enumeration/cookie.enum';
import { LocalService } from './../../service/cookie/local.service';
import { Subscription, Observable } from 'rxjs';
import { IProject } from './../../model/IProject';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService, EmployeeService } from 'src/app/service/api/api';
import { DomSanitizer } from '@angular/platform-browser';
import { IEmployee } from 'src/app/model/models';

/**
 * @author Danny B.
 * 
 * @since 1.0
 * @version 1.0
 */
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnDestroy {

  /**
   * Buffer object to send as body
   */
  buffObject: IProject;

  /**
   * Project subscription
   */
  projectSub: Subscription;

  /**
   * Creator observable
   */
  creator$: Observable<IEmployee>;

  // Bools
  isLinkThere: boolean = true;
  isTitleThere: boolean = true;
  isDescriptionThere: boolean = true;
  isGoalThere: boolean = true;
  isImageThere: boolean = true;

  /**
   * Creates an object of CreateComponent.
   * @param router Router
   * @param projectService Project API
   * @param employee Employee API
   * @param sanitizer Image parser
   */
  constructor(
    private router: Router,
    private localService: LocalService,
    private projectService: ProjectService,
    private employeeService: EmployeeService,
    private sanitizer: DomSanitizer
  ) { }

  /**
   * Initializes all required observables and variables
   */
  ngOnInit() {
    this.buffObject = new class implements IProject{
      id: number = 0;
      employeeId: number;
      link: string = "";
      title: string = "";
      description: string = "";
      goal: number = 0;
      investedIn: number = 0;
      reached: boolean = false;
      image: string = "";
      createdAt: Date = new Date;
      fundedAt: Date = new Date;
    }

    this.buffObject.employeeId = this.localService.getAsInteger(Cookie.ID);

    this.creator$ = this.employeeService.getEmployeeById(this.localService.getAsInteger(Cookie.ID));
  }

  /**
   * Unsubscribes all subscriptions
   */
  ngOnDestroy(): void {
    this.projectSub.unsubscribe();
  }

  /**
   * Sets the inputs values into the buffer object
   * @param event The event
   */
  public focusoutHandler(event) {
    switch (event.target.id) {
      case 'inputLink': 
        this.buffObject.link = event.target.value;
        if (this.buffObject.link.length == 0) {
          this.isLinkThere = false;
        } else {
          this.isLinkThere = true;
        }
        break;
      case 'inputTitle': 
        this.buffObject.title = event.target.value;
        if (this.buffObject.title.length == 0) {
          this.isTitleThere = false;
        } else {
          this.isTitleThere = true;
        }
        break;
      case 'inputDescription': 
        this.buffObject.description = event.target.value;
        if (this.buffObject.description.length == 0) {
          this.isDescriptionThere = false;
        } else {
          this.isDescriptionThere = true;
        }
        break;
      case 'inputGoal': 
        this.buffObject.goal = event.target.value;
        if (this.buffObject.goal <= 0) {
          this.isGoalThere = false;
        } else {
          this.isGoalThere = true;
        }
        break;
      case 'inputImage': 
        this.buffObject.image = "event.target.value;";
        if (this.buffObject.image.length == 0) {
          this.isImageThere = false;
        } else {
          this.isImageThere = true;
        }
        break;
    }
  }

  /**
   * Sends the API calls to create a project
   */
  public fire() {
    this.projectSub = this.projectService.addProject(this.buffObject)
      .subscribe(
        project => {console.log(project)},
        error => {console.log(error)
          console.log(this.buffObject)},
      );
  }
}
