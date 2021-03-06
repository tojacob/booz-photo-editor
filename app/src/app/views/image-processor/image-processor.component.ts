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
import { environment as env } from "src/environments/environment";
import { AccessoryTemplateComponent } from 'src/app/modules/templates/accessory-template/accessory-template.component';

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
  private currentProcessedImageIndex = 1;
  private readonly templateComponents: Record<EditorType, Type<any>> = {
    [EditorType.general]: GeneralTemplateComponent,
    [EditorType.shirt]: ShirtTemplateComponent,
    [EditorType.jacket]: JacketTemplateComponent,
    [EditorType.pants]: PantsTemplateComponent,
    [EditorType.shoes]: ShoesTemplateComponent,
    [EditorType.accessory]: AccessoryTemplateComponent
  };

  @ViewChild(ImageProcessorDirective, { static: true })
  private template!: ImageProcessorDirective;

  constructor(
    private editorsService: EditorsService,
    private editorService: EditorService
  ) { }

  public async ngOnInit(): Promise<void> {
    for (const editor of this.editors) {
      await this.editorProcess(editor);

      this.currentEditorIndex += 1;
      this.currentImageIndex = 1;
    }

    await this.editorService.finish(this.processedImages);
  }

  private async editorProcess(editor: Editor): Promise<void> {
    const data = editor.form.value;
    const images: File[] = data?.file ? Array.from(data.file) : [];

    for (const image of images) {
      await this.imageProcess(image, data, editor.type);
      this.currentImageIndex += 1;
    }
  }

  private async imageProcess(
    image: File, data: any, type: EditorType
  ): Promise<void> {
    const file = await this.getBase64ImgFromFile(image);
    const resolution = await this.getImgResolutionFromFile(file);
    const sizes: string[] = this.editorService.getMerchSizes(data.size);
    data.file = file;

    if (sizes.length <= 1) {
      await this.templateProcess(type, data, resolution);
      return;
    };

    for (const size of sizes) {
      const _data = Object.assign({}, data, { size });
      await this.templateProcess(type, _data, resolution);
    }
  }

  private async templateProcess(
    type: EditorType, data: any, resolution: ImageResolution
  ): Promise<void> {
    const templateComponent = this.getTemplateComponentByType(type);
    const viewContainerRef = this.template.viewContainerRef;

    viewContainerRef.clear();

    const templateRef = viewContainerRef.createComponent<TemplateComponent>(templateComponent);
    templateRef.instance.data = data;
    templateRef.instance.resolution = resolution;
    const template = await firstValueFrom(templateRef.instance.bootstraped$);
    const processedImage = await this.canvasProcess(template);
    this.currentProcessedImageIndex += 1;

    this.processedImages.push(processedImage);
  }

  private async canvasProcess(template: HTMLElement): Promise<ProcessedImage> {
    const canvas = await html2canvas(template, { scale: 1 });
    const base64ImageURL = canvas.toDataURL('image/jpeg', 0.8);
    const base64Response = await fetch(base64ImageURL);
    const name = [
      this.currentEditorIndex,
      this.currentImageIndex,
      this.currentProcessedImageIndex,
      this.batchTimestamp,
      env.plainVersion
    ];
    const processedImage: ProcessedImage = {
      name: `${name.join("-")}.jpeg`,
      input: base64Response,
      lastModified: new Date(this.batchTimestamp)
    };

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
