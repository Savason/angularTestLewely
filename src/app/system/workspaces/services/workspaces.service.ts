import {Injectable} from '@angular/core';
import {BaseApi} from '../../../shared/base-api/base-api';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {WorkspaceModel} from '../models/workspace.model';
import {ProjectsService} from '../../projects/services/projects.service';
import {Router} from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Accept,Accept-Charset,Accept-Encoding,Accept-Language,Authorization,' +
    'Connection,Content-Type,Cookie,DNT,Host,Keep-Alive,Origin,Referer,User-Agent,X-CSRF-Token,X-Requested-With',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Expose-Headers': 'Authorization',
    'Access-Control-Allow-Credentials': 'true',
  })
};

@Injectable()
export class WorkspacesService extends BaseApi {

  public workspaces = [];
  public workspaces$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.workspaces);
  sub1: Subscription;

  constructor(public http: HttpClient,
              private projectService: ProjectsService,
              private router: Router) {
    super(http);
  }

  getWorkspacesList(): Observable<any> {
    return this.get(`workspaces`);
  }

  createNewWorkspace(workspace: WorkspaceModel): Observable<any> {
    return this.post(`workspaces`, workspace, httpOptions);
  }

  deleteWorkspace(workspaceId): Observable<any> {
    return this.delete(`workspaces/${workspaceId}`);
  }

  setDataWorkspaces(workspace) {
    return this.workspaces$.next(workspace);
  }

  addToWorkspacesList(workspace) {
    this.workspaces$.next(this.workspaces$.getValue().concat(workspace));
  }

  removeWorkspaceFormList(workspaceId) {
    this.setDataWorkspaces(this.workspaces$.getValue().filter(w => w.id !== workspaceId));
  }

  setActiveFirstWorkspace() {
    const firstWorkspace = this.workspaces$.getValue()[0].id;
    localStorage.setItem('currentWorkspace', JSON.parse(firstWorkspace));
  }

  setActiveWorkspace(id) {
    this.workspaces$.getValue().forEach((value) => {
      value.active = false;
    });
    const activeWorkspaceId = this.workspaces$.getValue().find(w => w.id === id).id;
    const activeWorkspaceActive = this.workspaces$.getValue().find(w => w.id === id).active = true;
    console.log(activeWorkspaceActive);
    localStorage.setItem('currentWorkspace', JSON.parse(activeWorkspaceId));
  }

  getActiveWorkspaceOnInit() {
    this.projectService.workspaceId = +localStorage.getItem('currentWorkspace');
    this.workspaces$.getValue().find(w => w.id === this.projectService.workspaceId).active = true;
  }

  getActiveWorkspace() {
    return localStorage.getItem('currentWorkspace');
  }

  getWorkspaceDetails(id) {
    this.setActiveWorkspace(id);
    this.projectService.workspaceId = id;
    this.router.navigateByUrl(`${id}/list`);
    this.sub1 = this.projectService.getProjectsList(id)
      .subscribe((data) => {
        this.projectService.setDataProjects(data.projects);
        this.sub1.unsubscribe();
      });
  }
}
