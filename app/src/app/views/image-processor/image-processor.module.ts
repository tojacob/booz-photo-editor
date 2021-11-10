import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageProcessorRoutingModule } from './image-processor-routing.module';
import { ImageProcessorComponent } from './image-processor.component';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { TemplatesModule } from 'src/app/modules/templates/templates.module';


@NgModule({
  declarations: [
    ImageProcessorComponent
  ],
  imports: [
    CommonModule,
    ImageProcessorRoutingModule,
    MaterialModule,
    TemplatesModule
  ]
})
export class ImageProcessorModule { }
