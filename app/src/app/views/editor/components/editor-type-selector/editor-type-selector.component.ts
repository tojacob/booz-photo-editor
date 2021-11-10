import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { EditorType } from '../../../../interfaces/editor.interfaces';

@Component({
  templateUrl: './editor-type-selector.component.html',
  styleUrls: ['./editor-type-selector.component.scss']
})
export class EditorTypeSelectorComponent implements OnInit {
  public readonly EDITOR_TYPE = EditorType;

  constructor(private btnSheet: MatBottomSheet) { }

  public ngOnInit(): void { }

  public onOptionSelection(selectedType: EditorType): void {
    this.btnSheet.dismiss(selectedType);
  }
}
