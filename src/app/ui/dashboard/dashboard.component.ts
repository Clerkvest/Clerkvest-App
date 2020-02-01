import { ProjectService } from './../../service/api/project.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IProject } from 'src/app/model/models';

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
export class DashboardComponent implements OnInit {

  /**
   * Observable to store all project that the employee got access to.
   */
  public projects$: Observable<IProject[]>;

  /**
   * Creates an instance of DashboardComponent with all needed services.
   * @param router Router to change between pages.
   * @param project ProjectService to get all project the employee got access to.
   */
  constructor(private router: Router, private projectService: ProjectService) { }

  /**
   * Initializes all required observables
   */
  ngOnInit() {
    this.projects$ = this.projectService.getProjects();
  }

  /**
   * Open a specific project with the given id.
   * NOTE: Projects are defined as investment to clearify that for the user.
   * @param id Id of the project to route to.
   */
  openProject(id: number) {
    this.router.navigate(['investment', id]);
  }
}
