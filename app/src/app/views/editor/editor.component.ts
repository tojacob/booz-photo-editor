import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { filter, take } from 'rxjs';
import { EditorType } from '../../interfaces/editor.interfaces';
import { EditorService } from '../../modules/services/editor.service';
import { EditorsService } from '../../modules/services/editors.service';
import { EditorTypeSelectorComponent } from './components/editor-type-selector/editor-type-selector.component';
import { HelperService } from './helper.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  public loading = true;
  public readonly EDITOR_TYPES = EditorType;

  constructor(
    private editor: EditorService,
    public editors: EditorsService,
    private helper: HelperService,
    private btnSheet: MatBottomSheet,
  ) { }

  public async ngOnInit(): Promise<void> {
    this.loading = false;
  }

  private addNewEditor(type: EditorType): void {
    const editor = this.helper.getNewEditor(type);
    this.editors.add(editor);
  }

  public onAddNewEditor(): void {
    const btnSheet = this.btnSheet.open(EditorTypeSelectorComponent);
    const onSelect = (type: EditorType) => { this.addNewEditor(type); };

    btnSheet
      .afterDismissed()
      .pipe(take(1), filter((type) => type !== undefined))
      .subscribe(onSelect);
  }

  public onRemoveEditor(index: number): void {
    this.editors.remove(index);
  }

  public async onRunEditor(): Promise<void> {
    await this.editor.run();
  }
}
