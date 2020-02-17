import { IInvestIn } from './../../model/IInvestIn';
import { ImageService } from 'src/app/service/api/image.service';
import { Observable, Subscription } from 'rxjs';
import { InvestService } from './../../service/api/invest.service';
import { CommentService } from './../../service/api/comment.service';
import { ProjectService } from './../../service/api/project.service';
import { EmployeeService } from 'src/app/service/api/employee.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { LocalService } from 'src/app/service/cookie/local.service';
import { IProject, IEmployee, IProjectComment } from 'src/app/model/models';
import { isNumber, isUndefined, isNullOrUndefined } from 'util';
import { Cookie } from 'src/app/enumeration/cookie.enum';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

/**
 * @author Danny B.
 * 
 * Investment logic
 * 
 * @since 1.0
 * @version 1.0
 */
@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.css']
})
export class InvestmentComponent implements OnInit, OnDestroy {
  /**
   * Observable of the current investment page
   */
  public project$: Observable<IProject>

  /**
   * Investment object
   */
  public project: IProject;

  /**
   * Investment sub
   */
  public projectSub: Subscription;

  /**
   * State of the investment.
   */
  public projectState: boolean;

  /**
   * Investment creator
   */
  public creator$: Observable<IEmployee>;

  /**
   * Investment comments
   */
  public comments$: Observable<IProjectComment[]>;

  /**
   * List of all project comments
   */
  public comments: IProjectComment[];

  /**
   * List of employees
   */
  public commentEmployees$: Observable<IEmployee>[] = new Array;

  /**
   * Comment sub
   */
  public commentsSub: Subscription;

  /**
   * Image sub
   */
  public imageSub: Subscription;

  /**
   * SafeUrl
   */
  public safeUrl: SafeUrl;

  /**
   * Invest
   */
  public invest: IInvestIn;

  /**
   * Currentlly invested
   */
  public invested$: Observable<number>;

  /**
   * Project comment
   */
  public comment: IProjectComment;

  /**
   * Current url id param
   */
  public idParam: string;

  /**
   * True if investment exists and user is allowed to view.
   */
  public doesExist: boolean;

  /**
   * Error string
   */
  public errorString: string;

  // Bools
  public isInvestThere: boolean;
  public hasInvested: boolean;
  public isCommentThere: boolean;

  /**
   * Creates an instance of InvestmentComponent
   * @param route To handle the current route param
   * @param router Router
   * @param localService To handle cookies
   * @param projectService Project API calls
   * @param CommentService Comment API calls
   * @param EmployeeService Employee API calls
   * @param investService Invest API calls
   */
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private localService: LocalService,
    private projectService: ProjectService,
    private commentService: CommentService,
    private employeeService: EmployeeService,
    private imageService: ImageService,
    private investService: InvestService,
    private sanitizer: DomSanitizer
  ) { }

  /**
   * Initializes all required observables
   */
  ngOnInit() {
    // Current param
    this.idParam = this.route.snapshot.paramMap.get('id');

    // Checking if param is numeric
    if(isNaN(Number.parseInt(this.idParam))) {
      return;
    }

    this.project$ = this.projectService.getProject(this.idParam);
    this.projectSub = this.project$.subscribe(project => {
      this.project = project;
      this.calculateState(this.project);

      this.creator$ = this.employeeService.getEmployeeById(this.project.employeeId);
      this.comments$ = this.commentService.getComments(this.project.id);
      this.invested$ = this.investService.getInvestmentAmountByProjectForEmployee(this.localService.getAsInteger(Cookie.ID), this.project.id);

      if(project.image !== null) {
        this.imageSub = this.imageService.getImageUsingGET(project.image).subscribe(image => {
          this.safeUrl = this.sanitizer.bypassSecurityTrustUrl("data:image/jpeg;base64," + image);
        });
      }

      this.commentsSub = this.comments$.subscribe(comments => {
        this.comments = comments;

        comments.forEach(single => {
          this.commentEmployees$.push(this.employeeService.getEmployeeById(single.employeeId));
        });

        this.doesExist = true;
      });
    })

    this.invest = new class implements IInvestIn{
      id?: number;
      projectId?: number;
      employeeId?: number;
      investment?: number;
    }

    this.comment = new class implements IProjectComment {
      id?: number;
      employeeId?: number;
      projectId?: number;
      title?: string;
      text?: string;
      date?: Date;
    }
  }

  /**
   * Unsubscribes all subscriptions
   */
  ngOnDestroy(): void {
    if(!isNullOrUndefined(this.projectSub)) {
      this.projectSub.unsubscribe();
    }

    if(!isNullOrUndefined(this.commentsSub)) {
      this.commentsSub.unsubscribe();
    }
  }

  /**
   * Calculates the current percent value
   * @param project Project to calculate
   */
  calculatePercent(project: IProject) {
    return Math.floor(((project.investedIn / project.goal) * 100));
  }

  /**
   * Calculates the state of the project.
   * Sets InvestmentComponent#projectState to true if calculatePercent is greater then 80%
   * @param project Project to calculate
   */
  calculateState(project: IProject) {
    this.projectState = this.calculatePercent(project) > 80;
  }

  /**
   * Navigates to the edit page of the project
   * @param project Project to update
   */
  editProject(project: IProject) {
    this.router.navigate(['update', project.id]);
  }

  /**
   * Navigates to the edit page of the project
   * @param project Project to update
   */
  deleteProject(project: IProject) {
    let sub = this.projectService.deleteProject(project.id).subscribe(
      ret => {
        console.log(ret);
        this.router.navigate(['dashboard']);
      },
      error => {
        console.log(error);
      },
      () => {
        sub.unsubscribe();
      }
    );
  }

  /**
   * Removes all investmentrs of a project from the current user logged in
   * @param project Project to delete from
   */
  removeInvestment(project: IProject) {
    let sub = this.investService.deleteInvestmentsByEmployeeAndProject(this.localService.getAsInteger(Cookie.ID), project.id).subscribe(
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

  /**
   * Checks if the current user is the creator of the project
   */
  isOwner(project: IProject){
    return project.employeeId === this.localService.getAsInteger(Cookie.ID);
  }

  /**
   * Invests into a project
   * @param project Project to invest into
   */
  investInto(project: IProject) {
    this.invest.projectId = this.project.id;
    this.invest.employeeId = this.localService.getAsInteger(Cookie.ID);
    let investSub = this.investService.addInvestment(this.invest).subscribe(
      ret => {
        this.hasInvested = true;
      },
      error => {
        this.hasInvested = false;
        this.errorString = error.status + " " + error.error.error;
      },
      () => {
        investSub.unsubscribe();
      }
    );
  }

  commentProject(project: IProject) {

    this.comment.title = "";
    this.comment.projectId = this.project.id;
    this.comment.employeeId = this.localService.getAsInteger(Cookie.ID);

    let sub: Subscription = this.commentService.addComment(this.comment).subscribe(
      ret => {
        console.log(ret);
      },
      error => {
        console.log(error);
      },
      () => {
        sub.unsubscribe();
      }
    )
  }

  /**
   * Sets the inputs values into the buffer object
   * @param event The event
   */
  public focusoutHandler(event) {
    switch (event.target.id) {
      case 'inputInvest': 
        this.invest.investment = event.target.value;
        if (this.invest.investment <= 0) {
          this.isInvestThere = false;
        } else {
          this.isInvestThere = true;
        }
        break;
      case 'inputComment': 
        this.comment.text = event.target.value;
        if (this.comment.text.length == 0) {
          this.isCommentThere = false;
        } else {
          this.isCommentThere = true;
        }
        break;
    }
  }
}