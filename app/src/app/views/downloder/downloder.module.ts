import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DownloderRoutingModule } from './downloder-routing.module';
import { DownloderComponent, ReloadDialogComponent } from './downloder.component';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { ComponentBundleModule } from 'src/app/modules/component-bundle/component-bundle.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DownloderComponent,
    ReloadDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DownloderRoutingModule,
    MaterialModule,
    ComponentBundleModule
  ]
})
export class DownloderModule { }
