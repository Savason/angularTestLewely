import {Component, Inject, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {WorkspacesService} from '../../services/workspaces.service';
import {WorkspaceModel} from '../../models/workspace.model';
import {SnackBarMessageService} from '../../../../shared/services/snackbar-message.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-add-new-workspace-btn',
  templateUrl: './add-new-workspace-btn.component.html',
  styleUrls: ['./add-new-workspace.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddNewWorkspaceBtnComponent {
  constructor(public dialog: MatDialog) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddNewWorkspaceComponent, {
      width: '750px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}

@Component({
  selector: 'app-add-new-workspace',
  templateUrl: './add-new-workspace.component.html',
  styleUrls: ['./add-new-workspace.component.scss']
})
export class AddNewWorkspaceComponent implements OnInit, OnDestroy {
  constructor(public dialogRef: MatDialogRef<AddNewWorkspaceComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder,
              private workspaceService: WorkspacesService,
              private messageService: SnackBarMessageService,
              private router: Router) {
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
    console.log(this.form.value);
    if (this.form.valid) {
      const {name} = this.form.value;
      const workspace = new WorkspaceModel(name);
      this.sub1 = this.workspaceService.createNewWorkspace(workspace)
        .subscribe((data) => {
          if (data) {
            this.dialogRef.close();
            console.log(data);
            this.workspaceService.addToWorkspacesList(data);
            this.messageService.openSnackBar('workspace ' + `${name}` + ' has been successfully created');
            this.workspaceService.getWorkspaceDetails(data.id);
            this.workspaceService.getActiveWorkspace();
          }
        });
    }
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }
}
