import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {ProjectsService} from '../../services/projects.service';
import {ProjectModel} from '../../models/project.model';
import {SnackBarMessageService} from '../../../../shared/services/snackbar-message.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-add-new-project-btn',
  templateUrl: './add-new-project-btn.component.html',
  styleUrls: ['./add-new-project.component.scss']
})
export class AddNewProjectBtnComponent {
  constructor(public dialog: MatDialog) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddNewProjectComponent, {
      width: '750px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}

@Component({
  selector: 'app-add-new-project',
  templateUrl: './add-new-project.component.html',
  styleUrls: ['./add-new-project.component.scss']
})
export class AddNewProjectComponent implements OnInit, OnDestroy {
  constructor(public dialogRef: MatDialogRef<AddNewProjectComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder,
              private messageService: SnackBarMessageService,
              private router: Router,
              private projectsService: ProjectsService) {
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
      description: [''],
    });
  }


  onSubmit() {
    if (this.form.valid) {
      const {name, description} = this.form.value;
      const project = new ProjectModel(name, this.projectsService.workspaceId, description);
      this.sub1 = this.projectsService.createNewProject(project)
        .subscribe((data) => {
          console.log(data);
          console.log(this.projectsService.projects$);
          this.dialogRef.close();
          if (data) {
            this.projectsService.addToProjectsList(data);
            this.messageService.openSnackBar('project ' + `${name}` + ' has been successfully created');
            this.router.navigateByUrl(`${data.id}/task_list`);
          }
        });
      console.log(project);
    }
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }
}
