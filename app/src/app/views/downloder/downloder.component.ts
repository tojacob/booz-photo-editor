import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { LoadingDialogComponent } from 'src/app/modules/component-bundle/loading-dialog/loading-dialog.component';
import { EditorService } from 'src/app/modules/services/editor.service';
import { EditorsService } from 'src/app/modules/services/editors.service';

@Component({
  template: `
    <h2 mat-dialog-title>¿Estas seguro?</h2>
    <div mat-dialog-content class="mat-typography">
      <p>
        Asegurate de guardar los documentos que editaste.
      </p>
    </div>
    <div mat-dialog-actions align="end">
      <button mat-button mat-dialog-close cdkFocusInitial>
        Cancelar
      </button>
      <button mat-button color="warn" [mat-dialog-close]="true">
        Si, reiniciar
      </button>
    </div>
  `
})
export class ReloadDialogComponent { }

@Component({
  selector: 'app-downloder',
  templateUrl: './downloder.component.html',
  styleUrls: ['./downloder.component.scss']
})
export class DownloderComponent implements OnInit {
  public loading = true;
  public downloadLink!: SafeUrl;
  public downloadName!: string;
  public totalSeconds: string = "";
  public totalProcessed: number = 0;
  public newDownloadMethod = false;

  constructor(
    private editorService: EditorService,
    private editorsSerive: EditorsService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  public async ngOnInit(): Promise<void> {
    if (!this.editorsSerive.content.length) {
      await this.router.navigateByUrl("editor");
      return;
    }

    const data = await this.editorService.getDownloadData();
    const statistics = this.editorService.getStatistics();
    this.downloadLink = data.url;
    this.downloadName = data.name;
    this.totalSeconds = statistics.seconds;
    this.totalProcessed = statistics.processed;
    this.loading = false;
  }

  public async reload(): Promise<void> {
    const confirmDialogRef = await this.dialog.open(ReloadDialogComponent);
    const result = await firstValueFrom(confirmDialogRef.afterClosed());

    if (result) {
      await this.dialog.open(LoadingDialogComponent, {
        disableClose: true,
        closeOnNavigation: false,
        backdropClass: "dialog-backdrop"
      });
      await this.router.navigateByUrl("");
      setTimeout(() => { window.location.reload(); }, 1000);
    }
  }
}
