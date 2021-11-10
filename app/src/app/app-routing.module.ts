import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'editor', loadChildren: () => import('./views/editor/editor.module').then(m => m.EditorModule) },
  { path: 'downloader', loadChildren: () => import('./views/downloder/downloder.module').then(m => m.DownloderModule) },
  { path: 'blank', loadChildren: () => import('./views/blank/blank.module').then(m => m.BlankModule) },
  { path: 'image-processor/:index/:type', loadChildren: () => import('./views/image-processor/image-processor.module').then(m => m.ImageProcessorModule) },
  { path: "", pathMatch: "full", redirectTo: "editor" },
  { path: "**", redirectTo: "editor" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
