import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MaterialModule } from '../material/material.module';
import { FooterComponent } from './footer/footer.component';
import { LoadingDialogComponent } from './loading-dialog/loading-dialog.component';



@NgModule({
  declarations: [
    ToolbarComponent,
    FooterComponent,
    LoadingDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ToolbarComponent,
    FooterComponent
  ]
})
export class ComponentBundleModule { }
