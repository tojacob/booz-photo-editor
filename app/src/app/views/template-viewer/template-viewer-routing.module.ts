import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessoryTemplateComponent } from 'src/app/modules/templates/accessory-template/accessory-template.component';
import { GeneralTemplateComponent } from 'src/app/modules/templates/general-template/general-template.component';
import { JacketTemplateComponent } from 'src/app/modules/templates/jacket-template/jacket-template.component';
import { PantsTemplateComponent } from 'src/app/modules/templates/pants-template/pants-template.component';
import { ShirtTemplateComponent } from 'src/app/modules/templates/shirt-template/shirt-template.component';
import { ShoesTemplateComponent } from 'src/app/modules/templates/shoes-template/shoes-template.component';

const routes: Routes = [
  { path: "general", component: GeneralTemplateComponent },
  { path: "shirt", component: ShirtTemplateComponent },
  { path: "jacket", component: JacketTemplateComponent },
  { path: "pants", component: PantsTemplateComponent },
  { path: "shoes", component: ShoesTemplateComponent },
  { path: "accessory", component: AccessoryTemplateComponent },
  { path: "", pathMatch: "full", redirectTo: "/editor" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateViewerRoutingModule { }
