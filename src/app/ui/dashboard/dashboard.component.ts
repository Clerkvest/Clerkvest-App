import { ImageService } from './../../service/api/image.service';
import { ProjectService } from './../../service/api/project.service';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IProject } from 'src/app/model/models';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { IProjectImage } from 'src/app/model/IProjectImage';
import { APP_BASE_HREF } from '@angular/common';
import { OrderModule } from 'ngx-order-pipe';

/**
 * @author Danny B.
 * 
 * Dashboard logic
 * 
 * @since 1.0
 * @version 1.0
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']})
export class DashboardComponent implements OnInit, OnDestroy {
  /**
   * Observable to store all project that the employee got access to.
   */
  public projects$: Observable<IProjectImage[]>;

  public projectsSub: Subscription;

  public projects: IProjectImage[];

  public loaded: boolean = false;

  /**
   * Creates an instance of DashboardComponent with all needed services.
   * @param router Router to change between pages.
   * @param project ProjectService to get all project the employee got access to.
   */
  constructor(
    private router: Router,
    private projectService: ProjectService,
    private sanitizer: DomSanitizer
  ) { }

  /**
   * Initializes all required observables
   */
  ngOnInit() {
    this.projects$ = this.projectService.getProjects();

    this.projectsSub = this.projects$.subscribe(
      projects => {
        this.projects = projects;
        this.orderByPercentageAsc();

        this.loaded = true;
      }
    );
  }

  /**
   * Unsubs every sub
   */
  ngOnDestroy() {
    this.projectsSub.unsubscribe();
  }

  orderByDateAsc() {
    this.projects = this.projects.sort(function (a, b) {
      let left: string = String(a.createdAt);
      let right: string = String(b.createdAt);

      if (left < right)
        return -1;
      if (left > right)
        return 1;

      return 0;
    });
  }

  orderByDateDesc() {
    this.projects = this.projects.sort(function (a, b) {
      let left: string = String(a.createdAt);
      let right: string = String(b.createdAt);

      if (left > right)
        return -1;
      if (left < right)
        return 1;

      return 0;
    });
  }

  orderByPercentageAsc() {
    console.log(this.projects);
    this.projects = this.projects.sort(function (a, b) {
      return Math.floor(((a.investedIn / a.goal) * 100)) - Math.floor(((b.investedIn / b.goal) * 100));
    });

    console.log(this.projects);
  }

  orderByPercentageDesc() {
    console.log(this.projects);
    this.projects = this.projects.sort(function (a, b) {
      return Math.floor(((b.investedIn / b.goal) * 100)) - Math.floor(((a.investedIn / a.goal) * 100));
    });

    console.log(this.projects);
  }

  /**
   * calculates the width of the progress bar in percent 
   * @param project Project to calculate for
   * @returns The percent value for the progress bar
   */
  calculateWidth(project: IProject): Number {
    return Math.floor(((project.investedIn / project.goal) * 100));
  }

  /**
   * Open a specific project with the given id.
   * NOTE: Projects are actually investments.
   * @param project Project to route to
   */
  openProject(project: IProject): void {
    this.router.navigate(['project', project.id]);
  }

  sliceDesc(desc: string) {
    return desc.slice(0, 100) + ' ...';
  }

  /**
   * Converts a string to a valid base64 string html can handle
   * @param image Image to convert
   */
  convertToBase64(image: string) {
    if(image !== null) {
      return this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + image);
    }
  }
}
