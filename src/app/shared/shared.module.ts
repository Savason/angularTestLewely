import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatCheckboxModule, MatDialogModule,
  MatIconModule,
  MatInputModule, MatMenuModule,
  MatOptionModule,
  MatSelectModule,
  MatSidenavModule, MatSnackBarModule, MatTooltipModule
} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SnackBarMessageService} from './services/snackbar-message.service';
import {HeaderComponent} from './components/header/header.component';
import {CommonModule} from '@angular/common';
import {QuillModule} from 'ngx-quill';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatSidenavModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatCheckboxModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatMenuModule,
    QuillModule,
  ],
  exports: [
    HeaderComponent,
    FormsModule,
    MatSidenavModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatCheckboxModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatMenuModule,
    QuillModule,
  ],
  declarations: [
    HeaderComponent
  ],
  providers: [
    SnackBarMessageService
  ]
})
export class SharedModule {
}
