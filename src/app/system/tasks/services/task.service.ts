import {Injectable} from '@angular/core';
import {BaseApi} from '../../../shared/base-api/base-api';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class TaskService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  public tasks = [];
  public tasks$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.tasks);
  public taskDetails = {};
  public taskDetails$: BehaviorSubject<Object> = new BehaviorSubject<Object>(this.taskDetails);
  public projectId;
  public taskId;

  getTaskListByProjectId(projectId): Observable<any> {
    return this.get(`projects/${projectId}`);
  }

  getTaskDetailsById(taskId): Observable<any> {
    return this.get(`tasks/${taskId}`);
  }

  createNewTask(newTask): Observable<any> {
    return this.post(`tasks?name=${newTask.name}&projectId=${newTask.projectId}`, newTask);
  }

  updateTask(taskId, key, value) {
    return this.put(`tasks/${taskId}?${key}=${value}`);
  }

  removeTaskById(taskId): Observable<any> {
    return this.delete(`tasks/${taskId}`);
  }

  setDataTasks(task) {
    return this.tasks$.next(task);
  }

  setDataTaskDetails(taskDetails) {
    return this.taskDetails$.next(taskDetails);
  }

  addToTasksList(project) {
    this.tasks$.next(this.tasks$.getValue().concat(project));
  }

  removeTaskFromList(taskId) {
    this.setDataTasks(this.tasks$.getValue().filter(t => t.id !== taskId));

  }
}
