import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DownloderComponent } from './downloder.component';

const routes: Routes = [{ path: '', component: DownloderComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DownloderRoutingModule { }
