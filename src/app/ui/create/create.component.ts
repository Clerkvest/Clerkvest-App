import { isNullOrUndefined } from 'util';
import { Cookie } from './../../enumeration/cookie.enum';
import { LocalService } from './../../service/cookie/local.service';
import { Subscription, Observable } from 'rxjs';
import { IProject } from './../../model/IProject';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService, EmployeeService } from 'src/app/service/api/api';
import { DomSanitizer } from '@angular/platform-browser';
import { IEmployee } from 'src/app/model/models';
import { ImageService } from 'src/app/service/api/image.service';

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

  /**
   * Creator subscription
   */
  creatorSub: Subscription;

  /**
   * Buff file
   */
  fileToUpload: any = null;

  /**
   * File upload sub
   */
  fileSub: Subscription;

  /**
   * Has project successfully created
   */
  hasCreated: boolean;

  /**
   * Error string
   */
  errorString: string = "";

  // Bools
  isLinkThere: boolean = true;
  isTitleThere: boolean = true;
  isDescriptionThere: boolean = true;
  isGoalThere: boolean = true;
  isImageThere: boolean = true;
  isUploading: boolean = false;
  isFileToBig: boolean = false;

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
    private imageService: ImageService,
    private sanitizer: DomSanitizer
  ) { }

  /**
   * Initializes all required observables and variables
   */
  ngOnInit() {
    this.buffObject = new class implements IProject{
      id: number = 0;
      employeeId: number = 0;
      companyId: number = 0;
      link: string = "";
      title: string = "";
      description: string = "";
      goal: number = 1;
      investedIn: number = 0;
      reached: boolean = false;
      image: number = 0;
      createdAt: Date = new Date;
    }

    this.buffObject.employeeId = this.localService.getAsInteger(Cookie.ID);

    this.creator$ = this.employeeService.getEmployeeById(this.localService.getAsInteger(Cookie.ID));
  }

  /**
   * Unsubscribes all subscriptions
   */
  ngOnDestroy(): void {
    if(!isNullOrUndefined(this.projectSub)) {
      this.projectSub.unsubscribe();
    }

    if(!isNullOrUndefined(this.creatorSub)) {
      this.creatorSub.unsubscribe();
    }

    if(!isNullOrUndefined(this.fileSub)) {
      this.fileSub.unsubscribe();
    }
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
        this.buffObject.image = 0;
        if (this.buffObject.image == 0) {
          this.isImageThere = false;
        } else {
          this.isImageThere = true;
        }
        break;
    }
  }

  /**
   * File change event
   * @param files Files to update. Takes the first only
   */
  onDrop(files: FileList) {
    if(files.item(0).size > 2e+6) {
      this.isFileToBig = true;
    } else {
      this.isFileToBig = false;
      this.fileToUpload = files.item(0);
    }
  }

  /**
   * Delete the file
   */
  deleteFile() {
    this.fileToUpload = null;
  }

  /**
   * Sends the API calls to create a project
   */
  public fire() {
    this.creatorSub = this.employeeService.getEmployeeById(this.localService.getAsInteger(Cookie.ID))
      .subscribe(e => { 
        this.buffObject.companyId = e.companyId;

        this.projectSub = this.projectService.addProject(this.buffObject)
          .subscribe(
            project => { 
              if(!isNullOrUndefined(this.fileToUpload)) {

                if(this.fileToUpload.size > 2e+6) {
                  this.hasCreated = false;
                  this.errorString = "File size can not be greater than 2mb.";
                } else {
                  this.isUploading = true;
                  this.fileSub = this.imageService.createProjectImageUsingPOST(this.fileToUpload, project.id).subscribe(
                    ret => {
                      this.hasCreated = true;
                      this.isUploading = false;
                      this.router.navigate(['project', project.id]);
                    },
                    error => {
                      this.hasCreated = false;
                      this.errorString = "Upload error: " + error.status + " " + error.error.error;
                    });
                }
              } else {
                this.router.navigate(['project', project.id]);
              }
            },
            error => {
              this.hasCreated = false;
              this.errorString = error.status + " " + error.error.error;
            },
          );
      });
  }
}
