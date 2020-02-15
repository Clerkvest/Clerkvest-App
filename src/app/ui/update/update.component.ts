import { ImageService } from './../../service/api/image.service';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalService } from 'src/app/service/cookie/local.service';
import { ProjectService, EmployeeService } from 'src/app/service/api/api';
import { DomSanitizer } from '@angular/platform-browser';
import { IProject, IEmployee } from 'src/app/model/models';
import { Cookie } from 'src/app/enumeration/cookie.enum';

/**
 * @author Danny B.
 * 
 * @since 1.0
 * @version 1.0
 */
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit, OnDestroy {

  /**
   * Current route param
   */
  idParam: string = "";

  /** 
   * Project observable
   */
  project$: Observable<IProject>;

  /**
   * Project object
   */
  project: IProject;

  /**
   * Project sub
   */
  projectSub: Subscription;

  /**
   * Creator observable
   */
  creator$: Observable<IEmployee>;

  /**
   * Creater object
   */
  creator: IEmployee;

  /**
   * Creator sub
   */
  creatorSub: Subscription;

  /**
   * Buff file
   */
  fileToUpload: File = null;

  /**
   * File upload sub
   */
  fileSub: Subscription;

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
  isOwner: boolean = true;
  hasUpdated: boolean;
  hasLoaded: boolean = false;

  /**
   * Creates an object of UpdateComponent.
   * @param router Router
   * @param projectService Project API
   * @param employee Employee API
   * @param sanitizer Image parser
   */
  constructor(
    private router: Router,
    private route: ActivatedRoute,
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
    // Current param
    this.idParam = this.route.snapshot.paramMap.get('id');

    // Checking if param is numeric
    if(isNaN(Number.parseInt(this.idParam))) {
      return;
    }

    this.project$ = this.projectService.getProject(this.idParam);
    this.creator$ = this.employeeService.getEmployeeById(this.localService.getAsInteger(Cookie.ID));

    this.projectSub = this.project$.subscribe(project => {
      this.project = project;

      this.creatorSub = this.creator$.subscribe(creator => {
        this.creator = creator;

        if(this.creator.id !== this.project.employeeId) {
          this.isOwner = false;
          return;
        }

        this.hasLoaded = true;
      });
    });
  }

  /**
   * Unsubscribes all subscriptions
   */
  ngOnDestroy(): void {
    this.projectSub.unsubscribe();
    this.creatorSub.unsubscribe();
  }

  /**
   * Sets the inputs values into the buffer object
   * @param event The event
   */
  public focusoutHandler(event) {
    switch (event.target.id) {
      case 'inputLink': 
        this.project.link = event.target.value;
        if (this.project.link.length == 0) {
          this.isLinkThere = false;
        } else {
          this.isLinkThere = true;
        }
        break;
      case 'inputTitle': 
        this.project.title = event.target.value;
        if (this.project.title.length == 0) {
          this.isTitleThere = false;
        } else {
          this.isTitleThere = true;
        }
        break;
      case 'inputDescription': 
        this.project.description = event.target.value;
        if (this.project.description.length == 0) {
          this.isDescriptionThere = false;
        } else {
          this.isDescriptionThere = true;
        }
        break;
      case 'inputGoal': 
        this.project.goal = event.target.value;
        if (this.project.goal <= 0) {
          this.isGoalThere = false;
        } else {
          this.isGoalThere = true;
        }
        break;
      case 'inputImage': 
        this.project.image = 0;
        if (this.project.image == 0) {
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
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  /**
   * Sends the API calls to update a project
   */
  public fire() {
    this.projectService.updateProject(this.project).subscribe(
      ret => {
        this.hasUpdated = true;
        this.imageService.createProjectImageUsingPOST(this.fileToUpload, Number.parseInt(this.idParam)).subscribe(
          ret => {
            console.log(ret);
        })
      },
      error => {
        this.hasUpdated = false;
        this.errorString = error.status + " " + error.error.error;
      }
    );
  }
}
