import { Component, OnInit, Type, ViewChild } from '@angular/core';
import { firstValueFrom, ReplaySubject } from 'rxjs';
import html2canvas from 'html2canvas';
import { Editor, EditorType } from 'src/app/interfaces/editor.interfaces';
import { ImageResolution, ProcessedImage } from 'src/app/interfaces/processor.interfaces';
import { EditorsService } from 'src/app/modules/services/editors.service';
import { ImageProcessorDirective } from './image-processor-directive';
import { GeneralTemplateComponent } from 'src/app/modules/templates/general-template/general-template.component';
import { ShirtTemplateComponent } from 'src/app/modules/templates/shirt-template/shirt-template.component';
import { JacketTemplateComponent } from 'src/app/modules/templates/jacket-template/jacket-template.component';
import { PantsTemplateComponent } from 'src/app/modules/templates/pants-template/pants-template.component';
import { EditorService } from 'src/app/modules/services/editor.service';
import { ShoesTemplateComponent } from 'src/app/modules/templates/shoes-template/shoes-template.component';

interface TemplateComponent {
  data: any;
  resolution: ImageResolution;
  bootstraped$: ReplaySubject<HTMLElement>;
}

@Component({
  selector: 'app-image-processor',
  templateUrl: './image-processor.component.html',
  styleUrls: ['./image-processor.component.scss']
})
export class ImageProcessorComponent implements OnInit {
  private readonly batchTimestamp = Date.now();
  private readonly editors = this.editorsService.content;
  private readonly processedImages: ProcessedImage[] = [];
  private currentEditorIndex = 1;
  private currentImageIndex = 1;
  private templateComponents: Record<EditorType, Type<any>> = {
    [EditorType.general]: GeneralTemplateComponent,
    [EditorType.shirt]: ShirtTemplateComponent,
    [EditorType.jacket]: JacketTemplateComponent,
    [EditorType.pants]: PantsTemplateComponent,
    [EditorType.shoes]: ShoesTemplateComponent
  };

  @ViewChild(ImageProcessorDirective, { static: true })
  private template!: ImageProcessorDirective;

  constructor(
    private editorsService: EditorsService,
    private editorService: EditorService
  ) { }

  public async ngOnInit(): Promise<void> {
    for (const editor of this.editors) {
      await this.editionProcess(editor);
      this.currentEditorIndex += 1;
      this.currentImageIndex = 1;
    }

    await this.editorService.finish(this.processedImages);
  }

  private async editionProcess(editor: Editor): Promise<void> {
    const data = Object.assign({}, editor.form.value);
    const images: File[] = data?.file ? Array.from(data.file) : [];

    for (const image of images) {
      await this.processingImages(image, data, editor.type);
    }
  }

  private async processingImages(
    image: File, data: any, type: EditorType
  ): Promise<void> {
    const sizes: string[] = this.editorService.getMerchSizes(data.size);
    data.file = await this.getBase64ImgFromFile(image);
    const resolution = await this.getImgResolutionFromFile(data.file);

    if (sizes.length <= 1) {
      await this.generateProcessedImage(type, data, resolution);
      return;
    };

    for (const size of sizes) {
      data.size = size;
      await this.generateProcessedImage(type, data, resolution);
    }
  }

  private async generateProcessedImage(
    type: EditorType, data: any, resolution: ImageResolution
  ): Promise<void> {
    const templateComponent = this.getTemplateComponentByType(type);
    const viewContainerRef = this.template.viewContainerRef;

    viewContainerRef.clear();

    const templateRef = viewContainerRef.createComponent<TemplateComponent>(templateComponent);
    templateRef.instance.data = data;
    templateRef.instance.resolution = resolution;
    const template = await firstValueFrom(templateRef.instance.bootstraped$);
    const processedImage = await this.createImage(template);

    this.processedImages.push(processedImage);
  }

  private async createImage(template: HTMLElement): Promise<ProcessedImage> {
    const canvas = await html2canvas(template, { scale: 1 });
    const base64ImageURL = canvas.toDataURL('image/jpeg', 0.8);
    const base64Response = await fetch(base64ImageURL);
    const processedImage: ProcessedImage = {
      name: `${this.currentEditorIndex}-${this.currentImageIndex}-${this.batchTimestamp}-processed.jpeg`,
      input: base64Response,
      lastModified: new Date(this.batchTimestamp)
    };
    this.currentImageIndex += 1;

    canvas.remove();
    URL.revokeObjectURL(base64ImageURL);

    return processedImage;
  }

  private getImgResolutionFromFile(imgUrl: string): Promise<ImageResolution> {
    return new Promise((resolve) => {
      const image = new Image();
      image.onload = () => {
        resolve({
          width: `${image.naturalWidth}px`,
          height: `${image.naturalHeight}px`
        });
      };
      image.src = imgUrl;
    });
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

  private getTemplateComponentByType(type: EditorType): Type<any> {
    return this.templateComponents[type];
  }
}
