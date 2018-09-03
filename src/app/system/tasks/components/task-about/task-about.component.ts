import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TaskService} from '../../services/task.service';
import {throwIfEmpty} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-task-about',
  templateUrl: './task-about.component.html',
  styleUrls: ['./task-about.component.scss']
})
export class TaskAboutComponent implements OnInit, OnDestroy {
  hasFocus = false;
  private debounceTime: any;
  public taskDetails;
  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  sub4: Subscription;
  sub5: Subscription;
  sub6: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private taskService: TaskService) {
  }

  ngOnInit() {
    console.log('init');
    this.sub1 = this.route.params
      .subscribe((params: Params) => {
        console.log(+params['id']);
        this.taskService.taskId = +params['id'];
        this.sub2 = this.taskService.getTaskDetailsById(this.taskService.taskId)
          .subscribe((data1) => {
            console.log(data1);
            this.sub3 = this.taskService.tasks$
              .subscribe((tasks) => {
                console.log(tasks);
                // const idx = tasks.findIndex(t => t.id === +this.taskService.taskId);
                // console.log(idx);
                // if (idx !== -1) {
                //   this.taskService.tasks$.value[idx] = data1;
                // }
                this.taskService.setDataTaskDetails(tasks.find(t => t.id === +this.taskService.taskId));
                this.taskDetails = this.taskService.taskDetails$;
                // const idx = this.taskService.tasks$.getValue().findIndex(t => t.id === +this.taskService.taskId);
                // console.log(idx);
                // if (idx !== -1) {
                //   this.taskService.tasks$.value[idx] = data1;
                // }
                // this.taskService.setDataTaskDetails((this.taskService.tasks$.getValue().find(t => t.id === +this.taskService.taskId)));
                // this.taskDetails = this.taskService.taskDetails$;
              });
          });
      });
  }

  deleteTask(task) {
    console.log(task.value.id);
    this.sub4 = this.taskService.removeTaskById(task.value.id)
      .subscribe((data) => {
        console.log(data);
        if (data === true) {
          this.router.navigateByUrl(`${this.taskService.projectId}/task_list`);
          this.taskService.removeTaskFromList(task.value.id);
        }
      });
  }

  handleSelectionChanged(taskId, event) {
    let descriptionTargetValue = event.html;
    clearTimeout(this.debounceTime);
    this.debounceTime = setTimeout(() => {
      if (descriptionTargetValue === null) {
        descriptionTargetValue = '';
      }
      this.sub5 = this.taskService.updateTask(taskId, 'description', descriptionTargetValue)
        .subscribe((data) => {
          console.log(data);
        });
    }, 500);
  }


  updateTaskName(taskId, event) {
    clearTimeout(this.debounceTime);
    this.debounceTime = setTimeout(() => {
      this.sub6 = this.taskService.updateTask(taskId, 'name', event.target.value)
        .subscribe((data) => {
          console.log(data);
        });
    }, 500);
  }

  backToTaskList() {
    this.router.navigateByUrl(`${this.taskService.projectId}/task_list`);
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
    if (this.sub4) {
      this.sub4.unsubscribe();
    }
    if (this.sub5) {
      this.sub5.unsubscribe();
    }
    if (this.sub6) {
      this.sub6.unsubscribe();
    }
  }
}
