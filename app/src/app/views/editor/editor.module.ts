import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ComponentBundleModule } from 'src/app/modules/component-bundle/component-bundle.module';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { EditorTypeSelectorComponent } from './components/editor-type-selector/editor-type-selector.component';
import { GeneralEditorComponent } from './components/general-editor/general-editor.component';
import { EditorRoutingModule } from './editor-routing.module';
import { EditorComponent } from './editor.component';
import { RemoveEditorDialogComponent } from './components/remove-editor-dialog/remove-editor-dialog.component';
import { ShirtEditorComponent } from './components/shirt-editor/shirt-editor.component';
import { PantsEditorComponent } from './components/pants-editor/pants-editor.component';
import { JacketEditorComponent } from './components/jacket-editor/jacket-editor.component';
import { ShoesEditorComponent } from './components/shoes-editor/shoes-editor.component';
import { AccessoryEditorComponent } from './components/accessory-editor/accessory-editor.component';


@NgModule({
  declarations: [
    EditorComponent,
    EditorTypeSelectorComponent,
    GeneralEditorComponent,
    RemoveEditorDialogComponent,
    ShirtEditorComponent,
    PantsEditorComponent,
    JacketEditorComponent,
    ShoesEditorComponent,
    AccessoryEditorComponent
  ],
  imports: [
    CommonModule,
    EditorRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentBundleModule,
    MaterialModule
  ]
})
export class EditorModule { }
