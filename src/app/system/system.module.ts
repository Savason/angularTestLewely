import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SystemComponent} from './system.component';
import {SharedModule} from '../shared/shared.module';
import {SystemRoutingModule} from './system-routing.module';
import {WorkspacesComponent} from './workspaces/workspaces.component';
import {ProjectsComponent} from './projects/projects.component';
import {TasksComponent} from './tasks/tasks.component';
import {TaskListComponent} from './tasks/components/task-list/task-list.component';
import { WorkspacesListComponent } from './workspaces/components/workspaces-list/workspaces-list.component';
import { ProjectsListComponent } from './projects/components/projects-list/projects-list.component';
import {AddNewWorkspaceBtnComponent, AddNewWorkspaceComponent} from './workspaces/components/add-new-workspace/add-new-workspace.component';
import {TaskAboutComponent} from './tasks/components/task-about/task-about.component';
import {AddNewProjectBtnComponent, AddNewProjectComponent} from './projects/components/add-new-project/add-new-project.component';
import {AddNewTaskBtnComponent, AddNewTaskComponent} from './tasks/components/add-new-task/add-new-task.component';
import {HeaderComponent} from '../shared/components/header/header.component';
import { ActiveLinkDirective } from './workspaces/directives/active-link.directive';
import {QuillActiveOnFocusDirective} from './tasks/directives/activeOnFocus.directive';
import { QuillActivePanelDirective } from './tasks/directives/quill-active-panel.directive';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SystemRoutingModule,
  ],
  declarations: [
    SystemComponent,
    WorkspacesComponent,
    ProjectsComponent,
    TasksComponent,
    TaskListComponent,
    TaskAboutComponent,
    WorkspacesListComponent,
    ProjectsListComponent,
    AddNewWorkspaceComponent,
    AddNewWorkspaceBtnComponent,
    AddNewProjectBtnComponent,
    AddNewProjectComponent,
    AddNewTaskComponent,
    AddNewTaskBtnComponent,
    ActiveLinkDirective,
    QuillActiveOnFocusDirective,
    QuillActivePanelDirective
  ],
  entryComponents: [
    AddNewWorkspaceComponent,
    AddNewProjectComponent,
    AddNewTaskComponent,
  ]
})
export class SystemModule {
}
