import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

import {TaskService} from '../../services/task.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnDestroy {
  public tasks;
  private projectId;
  private debounceTime: any;
  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;

  constructor(private route: ActivatedRoute,
              private taskService: TaskService) {
  }

  ngOnInit() {
    this.sub1 = this.route.params
      .subscribe((params: Params) => {
        this.taskService.projectId = +params['id'];
        this.sub2 = this.taskService.getTaskListByProjectId(this.taskService.projectId)
          .subscribe((data) => {
            console.log(data);
            this.taskService.setDataTasks(data.tasks);
            this.tasks = this.taskService.tasks$;
            console.log(this.tasks);
            this.sub2.unsubscribe();
          });
      });
  }

  updateTaskName(taskId, event) {
    clearTimeout(this.debounceTime);
    this.debounceTime = setTimeout(() => {
      this.sub3 = this.taskService.updateTask(taskId, 'name', event.target.value)
        .subscribe((data) => {
          console.log(data);
        });
    }, 500);
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
    if (this.sub3) {
      this.sub3.unsubscribe();
    }
  }
}
