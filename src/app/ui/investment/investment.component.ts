import { Observable, Subscription } from 'rxjs';
import { InvestService } from './../../service/api/invest.service';
import { CommentService } from './../../service/api/comment.service';
import { ProjectService } from './../../service/api/project.service';
import { EmployeeService } from 'src/app/service/api/employee.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalService } from 'src/app/service/cookie/local.service';
import { IProject, IEmployee, IProjectComment } from 'src/app/model/models';
import { isNumber } from 'util';

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
  public commentEmployees$: Observable<IEmployee>[] = [];

  /**
   * Comment sub
   */
  public commentsSub: Subscription;

  /**
   * Current url id param
   */
  public idParam: string;

  /**
   * True if investment exists and user is allowed to view.
   */
  public doesExist: boolean = false;

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
    private investService: InvestService
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

      this.comments$.subscribe(comments => {
        this.comments = comments;

        comments.forEach(single => {
          this.commentEmployees$.push(this.employeeService.getEmployeeById(single.employeeId));
        });

        this.doesExist = true;
      });
    })
  }

  /**
   * Unsubscribes all subscriptions
   */
  ngOnDestroy(): void {
    this.projectSub.unsubscribe();
    this.commentsSub.unsubscribe();
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
}