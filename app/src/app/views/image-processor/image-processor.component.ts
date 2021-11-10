import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, Subject, timeout, timer } from 'rxjs';
import html2canvas from 'html2canvas';
import { Editor, EditorType } from 'src/app/interfaces/editor.interfaces';
import { ProcessedImage } from 'src/app/interfaces/processor.interfaces';
import { EditorsService } from 'src/app/modules/services/editors.service';
import { ProcessorService } from 'src/app/modules/services/processor.service';

@Component({
  selector: 'app-image-processor',
  templateUrl: './image-processor.component.html',
  styleUrls: ['./image-processor.component.scss']
})
export class ImageProcessorComponent implements OnInit, OnDestroy {
  public bootstraped = false;
  public editor!: Editor;
  public currentEdition!: any;
  private editorIndex!: string;
  public readonly EDITOR_TYPES = EditorType;
  private readonly processedImages: ProcessedImage[] = [];
  private readonly processed$ = new Subject<void>();
  private readonly batchTimestamp = Date.now();

  constructor(
    private editorsService: EditorsService,
    private processor: ProcessorService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  public async ngOnInit(): Promise<void> {
    const queries = await firstValueFrom(this.route.queryParamMap);
    const onlyTest = queries.get("onlyTest");
    const params = await firstValueFrom(this.route.paramMap);
    const type = <string>params.get("type");
    this.editorIndex = <string>params.get("index");
    const editorsCount = this.editorsService.content?.length;

    if (onlyTest) {
      this.editor = {
        type: parseInt(type),
        form: <any>undefined
      };
      this.bootstraped = true;
      return;
    }

    if (!editorsCount) {
      await this.router.navigateByUrl("");
      return;
    }

    await this.startEditionProcess();
    this.processor.sendProcessedImages(this.processedImages);
  }

  public ngOnDestroy(): void {
    this.processed$.complete();
  }

  private getBase64ImgFromFile(file: File): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileReader = <FileReader>event.target;
        const base64Image = <string>fileReader.result;
        resolve(base64Image);
      };

      reader.readAsDataURL(file);
    });
  };

  private async startEditionProcess(): Promise<void> {
    this.editor = this.editorsService.get(parseInt(this.editorIndex));
    const data = Object.assign({}, this.editor.form.value);
    const images: File[] = Array.from(<FileList>data.file);

    for (const image of images) {
      const dataSizes = data.sizes || "";
      const sizes: string[] = dataSizes.split(",").map((size: string) => size.trim());
      data.file = await this.getBase64ImgFromFile(image);

      if (sizes.length <= 1) {
        this.bootstraped = false;
        this.currentEdition = data;
        await firstValueFrom(timer(300));
        this.bootstraped = true;
        await firstValueFrom(this.processed$);
        continue;
      }

      for (const size of sizes) {
        this.bootstraped = false;
        this.currentEdition = Object.assign(data, { sizes: size });
        await firstValueFrom(timer(300));
        this.bootstraped = true;
        await firstValueFrom(this.processed$);
      }
    }
  }

  public async createImage(template: HTMLElement): Promise<ProcessedImage> {
    const canvasSize = 800;
    const canvas = await html2canvas(template, {
      width: canvasSize,
      height: canvasSize,
      scale: 2
    });
    const base64ImageURL = canvas.toDataURL('image/jpeg', 0.8);
    const base64Response = await fetch(base64ImageURL);
    const counter = this.processedImages?.length;
    const processedImage: ProcessedImage = {
      name: `${counter}-${this.editorIndex}-${this.batchTimestamp}-processed.jpeg`,
      input: base64Response,
      lastModified: new Date(this.batchTimestamp)
    };

    canvas.remove();
    URL.revokeObjectURL(base64ImageURL);

    return processedImage;
  }

  public async onTemplateMounted(template: HTMLElement): Promise<void> {
    const image = await this.createImage(template);

    this.processedImages.push(image);
    this.processed$.next(void 0);
  }
}
