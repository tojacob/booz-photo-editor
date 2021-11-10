import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { downloadZip } from "client-zip";
import { LoadingDialogComponent } from '../component-bundle/loading-dialog/loading-dialog.component';
import { EditorsService } from './editors.service';
import { ProcessorService } from './processor.service';
import { ProcessedImage } from 'src/app/interfaces/processor.interfaces';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  private zip: Blob | null = null;

  constructor(
    private editors: EditorsService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private processor: ProcessorService
  ) { }

  private async createZipFromBase64Images(images: ProcessedImage[]): Promise<void> {
    this.zip = await downloadZip(images).blob();
  }

  public async run(): Promise<void> {
    const editorsCount = this.editors.content?.length;
    const loaderRef = this.dialog.open(LoadingDialogComponent, {
      disableClose: true,
      backdropClass: "dialog-backdrop"
    });
    let index: number = 0;
    let missingImage = false;

    if (!editorsCount) {
      const msg = "Agrega un editor para continuar...";

      loaderRef.close();
      this.snackbar.open(msg, "OK", { duration: 5000 });
      return;
    };

    for (const editor of this.editors.content) {
      const data = editor.form.value;
      const images = <FileList | null>data.file;
      missingImage = images?.length ? false : true;
    }

    if (missingImage) {
      missingImage = true;
      const msg = "Uno de los editores no tiene imagen...";
      loaderRef.close();
      await this.snackbar.open(msg, "OK", { duration: 5000 });

      return;
    };

    for (const editor of this.editors.content) {
      const url = `image-processor/${index}/${editor.type}`;
      index += 1;

      await this.router.navigateByUrl("blank");
      await this.router.navigateByUrl(url);
      await firstValueFrom(this.processor.processed$);
    }

    await this.createZipFromBase64Images(this.processor.getProcessedImages());
    await this.router.navigateByUrl("downloader");
    loaderRef.close();
  }

  public getZip(): Blob | null {
    return this.zip;
  }
}
