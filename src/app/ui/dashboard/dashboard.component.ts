import { ImageService } from './../../service/api/image.service';
import { ProjectService } from './../../service/api/project.service';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IProject } from 'src/app/model/models';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { IProjectImage } from 'src/app/model/IProjectImage';
import { APP_BASE_HREF } from '@angular/common';

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
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  /**
   * Observable to store all project that the employee got access to.
   */
  public projects$: Observable<IProjectImage[]>;

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
  }

  /**
   * Unsubs every sub
   */
  ngOnDestroy() {
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
