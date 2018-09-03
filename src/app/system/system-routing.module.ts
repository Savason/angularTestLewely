import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SystemComponent} from './system.component';
import {ProjectsComponent} from './projects/projects.component';
import {WorkspacesComponent} from './workspaces/workspaces.component';
import {TaskListComponent} from './tasks/components/task-list/task-list.component';
import {TasksComponent} from './tasks/tasks.component';
import {TaskAboutComponent} from './tasks/components/task-about/task-about.component';

const routes: Routes = [
  {
    path: '',
    component: SystemComponent,
    children: [
      {
        path: ':id/list',
        component: TasksComponent
      },
      {
        path: ':id/task_list',
        component: TaskListComponent,
        children: [
          {
            path: ':id',
            component: TaskAboutComponent
          }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class SystemRoutingModule {
}
