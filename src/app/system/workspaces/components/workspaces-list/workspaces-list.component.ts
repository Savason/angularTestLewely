import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {WorkspacesService} from '../../services/workspaces.service';
import {ProjectsService} from '../../../projects/services/projects.service';
import {SnackBarMessageService} from '../../../../shared/services/snackbar-message.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-workspaces-list',
  templateUrl: './workspaces-list.component.html',
  styleUrls: ['./workspaces-list.component.scss']
})
export class WorkspacesListComponent implements OnInit, OnDestroy {
  public workspaces;
  firstSelectedWorkspace;
  sub1: Subscription;
  sub2: Subscription;

  constructor(private workspaceService: WorkspacesService,
              private router: Router,
              private messageService: SnackBarMessageService,
              private projectsService: ProjectsService) {
  }

  ngOnInit() {
    this.sub1 = this.workspaceService.getWorkspacesList()
      .subscribe((data) => {
        console.log(this.projectsService.workspaceId);
        if (data) {
          this.workspaceService.setDataWorkspaces(data);
          this.workspaces = this.workspaceService.workspaces$;
          console.log(this.workspaces.getValue().length);
          if (this.projectsService.workspaceId) {
            this.getProjectsById(this.projectsService.workspaceId);
          }
          // if (this.workspaces.getValue().length === 1) {
          //   this.workspaceService.setActiveFirstWorkspace();
          //   this.firstSelectedWorkspace = this.workspaceService.getActiveWorkspace();
          //   this.projectsService.workspaceId = this.firstSelectedWorkspace;
          //   // this.router.navigateByUrl(`${this.firstSelectedWorkspace}/list`);
          //   this.projectsService.workspaceId = this.firstSelectedWorkspace;
          //   this.projectsService.getProjectsList(this.firstSelectedWorkspace)
          //     .subscribe((data1) => {
          //       this.projectsService.setDataProjects(data1.projects);
          //     });
          // } else if (this.workspaces.getValue().length > 1) {
          //   console.log('more 1');
          //   this.firstSelectedWorkspace = this.workspaceService.getActiveWorkspace();
          //   this.projectsService.workspaceId = this.firstSelectedWorkspace;
          //   // this.router.navigateByUrl(`${this.firstSelectedWorkspace}/list`);
          //   this.projectsService.workspaceId = this.firstSelectedWorkspace;
          //   this.projectsService.getProjectsList(this.firstSelectedWorkspace)
          //     .subscribe((data1) => {
          //       this.projectsService.setDataProjects(data1.projects);
          //     });
          // }
          this.workspaceService.getActiveWorkspaceOnInit();
        }
      });
  }

  getProjectsById(id: string | number) {
    this.workspaceService.getWorkspaceDetails(id);
  }

  deleteWorkspaceById(workspace) {
    this.sub2 = this.workspaceService.deleteWorkspace(workspace.id)
      .subscribe((data) => {
        if (data === true) {
          this.workspaceService.removeWorkspaceFormList(workspace.id);
          this.messageService.openSnackBar('workspace ' + `${workspace.name}` + ' has been successfully created');
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
