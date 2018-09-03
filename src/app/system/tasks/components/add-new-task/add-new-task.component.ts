import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {AddNewProjectComponent} from '../../../projects/components/add-new-project/add-new-project.component';
import {SnackBarMessageService} from '../../../../shared/services/snackbar-message.service';
import {TaskModel} from '../../models/task.model';
import {TaskService} from '../../services/task.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-add-new-task-btn',
  templateUrl: './add-new-task-btn.component.html',
  styleUrls: ['./add-new-task.component.scss']
})
export class AddNewTaskBtnComponent {
  constructor(public dialog: MatDialog) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddNewTaskComponent, {
      width: '750px',
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.component.html',
  styleUrls: ['./add-new-task.component.scss']
})
export class AddNewTaskComponent implements OnInit, OnDestroy {

  constructor(public dialogRef: MatDialogRef<AddNewProjectComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder,
              private taskService: TaskService,
              private messageService: SnackBarMessageService,
              private route: Router) {
  }

  public form: FormGroup;
  sub1: Subscription;

  getErrorNameMessage() {
    return this.form.get('name')['errors']['required'] ? 'This field is required' :
      '';
  }


  onNoClick(): void {
    this.dialogRef.close(this.data);
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
  }


  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close();
      const {name} = this.form.value;
      const newTask = new TaskModel(name, this.taskService.projectId);
      console.log(newTask);
      this.taskService.createNewTask(newTask)
        .subscribe((data) => {
          console.log(data);
          this.taskService.addToTasksList(data);
          this.route.navigateByUrl(`${this.taskService.projectId}/task_list/${data.id}`);
          this.messageService.openSnackBar('task ' + `${name}` + ' has been successfully created');
        });
    }
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

}
