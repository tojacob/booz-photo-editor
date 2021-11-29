import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { downloadZip } from "client-zip";
import { ProcessedImage } from 'src/app/interfaces/processor.interfaces';
import { LoadingDialogComponent } from '../component-bundle/loading-dialog/loading-dialog.component';
import { EditorsService } from './editors.service';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  private loader!: MatDialogRef<LoadingDialogComponent>;
  private processedImages: ProcessedImage[] = [];
  private startTimeMs: number = 0;
  private endTimeMs: number = 0;

  constructor(
    private editors: EditorsService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  public async run(): Promise<void> {
    if (!this.editors.content?.length) {
      const msg = "Agrega un editor para continuar...";
      this.snackbar.open(msg, "OK", { duration: 5000 });
      return;
    };

    this.startTimeMs = Date.now();
    await this.openLoader();
    await this.router.navigateByUrl("image-processor");
  }

  public async finish(processedImages: ProcessedImage[]): Promise<void> {
    if (!processedImages.length) {
      const msg = "Los editores no tienen imagen...";

      await this.router.navigateByUrl("editor");
      await this.closeLoader();
      this.snackbar.open(msg, "OK", { duration: 5000 });
      return;
    }

    this.processedImages = processedImages;

    await this.router.navigateByUrl("downloader");
    await this.closeLoader();
    this.endTimeMs = Date.now();
  }

  private openLoader(): void {
    this.loader = this.dialog.open(LoadingDialogComponent, {
      backdropClass: "dialog-backdrop",
      closeOnNavigation: false,
      disableClose: true,
    });
  }

  private async closeLoader(): Promise<void> {
    if (this.loader) await this.loader.close();
  }

  public async getDownloadData(): Promise<{ url: SafeUrl, name: string; }> {
    const zip = await downloadZip(this.processedImages).blob();
    const dateMs = Date.now();
    const link = URL.createObjectURL(<Blob>zip);
    const url = this.sanitizer.bypassSecurityTrustUrl(link);
    const name = `booz-photos-${dateMs}.zip`;

    return { url, name };
  }

  public getStatistics(): { seconds: string; processed: number; } {
    const ms = this.endTimeMs - this.startTimeMs;
    const seconds = (ms / 1000).toFixed();
    const processed = this.processedImages.length;

    return { seconds, processed };
  }

  public getMerchSizes(value: string | null): string[] {
    if (value) {
      const trim = (size: string) => size.trim();
      return value.split(",").map(trim);
    }

    return [];
  }
}
