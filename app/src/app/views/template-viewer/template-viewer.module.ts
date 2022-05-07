import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateViewerRoutingModule } from './template-viewer-routing.module';
import { TemplatesModule } from 'src/app/modules/templates/templates.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TemplateViewerRoutingModule,
    TemplatesModule
  ]
})
export class TemplateViewerModule { }
