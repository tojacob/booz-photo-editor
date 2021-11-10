import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoadingDialogComponent } from 'src/app/modules/component-bundle/loading-dialog/loading-dialog.component';
import { EditorService } from 'src/app/modules/services/editor.service';

@Component({
  selector: 'app-downloder',
  templateUrl: './downloder.component.html',
  styleUrls: ['./downloder.component.scss']
})
export class DownloderComponent implements OnInit {
  public loading = true;
  public downloadLink!: SafeUrl;
  public downloadName!: string;

  constructor(
    private editorService: EditorService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    const zip = this.editorService.getZip();

    if (!zip) {
      this.reload();
      return;
    }

    const dateMs = Date.now();
    const url = URL.createObjectURL(<Blob>zip);
    this.downloadLink = this.sanitizer.bypassSecurityTrustUrl(url);
    this.downloadName = `booz-photos-${dateMs}.zip`;
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
