import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoadingDialogComponent } from 'src/app/modules/component-bundle/loading-dialog/loading-dialog.component';
import { EditorService } from 'src/app/modules/services/editor.service';
import { EditorsService } from 'src/app/modules/services/editors.service';

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
    await this.dialog.open(LoadingDialogComponent, {
      disableClose: true,
      closeOnNavigation: false,
      backdropClass: "dialog-backdrop"
    });
    await this.router.navigateByUrl("");
    window.location.reload();
  }
}
