import {Injectable} from '@angular/core';
import {BaseApi} from '../../../shared/base-api/base-api';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {ProjectModel} from '../models/project.model';

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
export class ProjectsService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  public projects = [];
  public projects$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.projects);
  public workspaceId;

  getProjectsList(workspaceId: number | string): Observable<any> {
    return this.get(`workspaces/${workspaceId}`);
  }

  createNewProject(project: ProjectModel): Observable<any> {
    return this.post(`projects?name=${project.name}&workspaceId=${project.workspaceId}&description=${project.description}`, '', httpOptions);
  }

  deleteProject(projectId: number | string): Observable<any> {
    return this.delete(`projects/${projectId}`);
  }

  setDataProjects(project) {
    return this.projects$.next(project);
  }

  addToProjectsList(project) {
    this.projects$.next(this.projects$.getValue().concat(project));
  }

  removeProjectFromList(projectId) {
    this.setDataProjects(this.projects$.getValue().filter(p => p.id !== projectId));
  }
}
