import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageProcessorComponent } from './image-processor.component';

const routes: Routes = [{ path: '', component: ImageProcessorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImageProcessorRoutingModule { }
