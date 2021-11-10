import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { Editor } from '../../../../interfaces/editor.interfaces';
import { HelperService } from '../../helper.service';
import { RemoveEditorDialogComponent } from '../remove-editor-dialog/remove-editor-dialog.component';

@Component({
  selector: 'app-shirt-editor',
  templateUrl: './shirt-editor.component.html',
  styleUrls: ['./shirt-editor.component.scss']
})
export class ShirtEditorComponent implements OnInit {
  public readonly labelPositions = this.helper.labelPositions;

  @Input() public index!: number;
  @Input() public editor!: Editor;
  @Output() public readonly remove = new EventEmitter<number>();

  constructor(
    private helper: HelperService,
    private dialog: MatDialog
  ) { }

  public ngOnInit(): void { }

  public onAddFiles(event: Event): void {
    const input = <HTMLInputElement>event.target;
    const files = <FileList>input.files;

    (<FormControl>this.editor.form.get("file")).patchValue(files);
  }

  public async onRemove(): Promise<void> {
    const dialogRef = this.dialog.open(RemoveEditorDialogComponent);

    dialogRef.afterClosed().pipe(take(1)).subscribe((res: boolean) => {
      if (res) this.remove.emit(this.index);
    });
  }
}
