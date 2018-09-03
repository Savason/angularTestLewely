import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthService} from '../auth/services/auth.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {JwtInterceptor} from './helpers/jwt.interceptor';
import {AuthGuard} from './guards/auth.guard';
import {WorkspacesService} from '../system/workspaces/services/workspaces.service';
import {ProjectsService} from '../system/projects/services/projects.service';
import {TaskService} from '../system/tasks/services/task.service';
import {SideNavService} from '../shared/services/side-nav.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
  ],
  providers: [
    AuthGuard,
    AuthService,
    WorkspacesService,
    ProjectsService,
    TaskService,
    SideNavService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    console.log('core loaded');
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
