import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {ProjectsService} from '../../services/projects.service';
import {SnackBarMessageService} from '../../../../shared/services/snackbar-message.service';
import {WorkspacesService} from '../../../workspaces/services/workspaces.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit, OnDestroy {
  public projects;
  sub1: Subscription;
  sub2: Subscription;

  constructor(private projectsService: ProjectsService,
              private workspaceService: WorkspacesService,
              private router: Router,
              private messageService: SnackBarMessageService) {
  }

  ngOnInit() {
    this.sub1 = this.projectsService.getProjectsList(+this.workspaceService.getActiveWorkspace())
      .subscribe((data) => {
        console.log(data);
        this.projectsService.setDataProjects(data.projects);
      });
    this.projects = this.projectsService.projects$;
    console.log(this.projects);
  }

  deleteProjectById(project) {
    console.log(this.projectsService.workspaceId);
    this.sub2 = this.projectsService.deleteProject(project.id)
      .subscribe((data) => {
        if (data === true) {
          console.log(data);
          this.projectsService.removeProjectFromList(project.id);
          this.router.navigateByUrl(`${this.projectsService.workspaceId}/list`);
          this.messageService.openSnackBar('project ' + `${project.name}` + ' has been successfully created');
        }
      });
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }

}
