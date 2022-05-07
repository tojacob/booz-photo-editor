import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralTemplateComponent } from './general-template/general-template.component';
import { ShirtTemplateComponent } from './shirt-template/shirt-template.component';
import { PantsTemplateComponent } from './pants-template/pants-template.component';
import { JacketTemplateComponent } from './jacket-template/jacket-template.component';
import { ShoesTemplateComponent } from './shoes-template/shoes-template.component';
import { MxSizePipe } from './shoes-template/mx-size.pipe';
import { AccessoryTemplateComponent } from './accessory-template/accessory-template.component';


@NgModule({
  declarations: [
    MxSizePipe,
    GeneralTemplateComponent,
    ShirtTemplateComponent,
    PantsTemplateComponent,
    JacketTemplateComponent,
    ShoesTemplateComponent,
    AccessoryTemplateComponent
  ],
  imports: [CommonModule],
  exports: [
    GeneralTemplateComponent,
    ShirtTemplateComponent,
    PantsTemplateComponent,
    JacketTemplateComponent,
    ShoesTemplateComponent,
    AccessoryTemplateComponent
  ]
})
export class TemplatesModule { }
