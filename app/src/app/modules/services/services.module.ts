import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EditorService } from './editor.service';
import { EditorsService } from './editors.service';
import { ProcessorService } from './processor.service';



@NgModule({
  declarations: [],
  imports: [
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [
    EditorService,
    EditorsService,
    ProcessorService
  ]
})
export class ServicesModule { }
