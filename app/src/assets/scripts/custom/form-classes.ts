import html2canvas from 'html2canvas';
import dayjs from 'dayjs';
import { controls, formTypes } from "./app.data";
import { AppControl, BadgePosition, ProcessedImage } from "./app.interfaces";

class MerchBase {
  protected badgePosition: HTMLSelectElement;
  protected file: HTMLInputElement;
  protected identification: HTMLInputElement;
  protected pantCourt: HTMLInputElement;
  protected pantColor: HTMLInputElement;
  protected pantSize: HTMLInputElement;
  protected price: HTMLInputElement;
  protected shirtSize: HTMLInputElement;
  protected shirtSizeDescription: HTMLInputElement;
  protected shoesSizeUs: HTMLInputElement;
  protected shoesSizeMx: HTMLInputElement;
  protected type: HTMLSelectElement;

  constructor(protected formIndex: string) {
    this.badgePosition = <HTMLSelectElement>this.getFormInput(controls.badgePosition);
    this.file = <HTMLInputElement>this.getFormInput(controls.file);
    this.identification = <HTMLInputElement>this.getFormInput(controls.identification);
    this.pantCourt = <HTMLInputElement>this.getFormInput(controls.pantCourt);
    this.pantColor = <HTMLInputElement>this.getFormInput(controls.pantColor);
    this.pantSize = <HTMLInputElement>this.getFormInput(controls.pantSize);
    this.price = <HTMLInputElement>this.getFormInput(controls.price);
    this.shirtSize = <HTMLInputElement>this.getFormInput(controls.shirtSize);
    this.shirtSizeDescription = <HTMLInputElement>this.getFormInput(controls.shirtSizeDescription);
    this.shoesSizeUs = <HTMLInputElement>this.getFormInput(controls.shoesSizeUs);
    this.shoesSizeMx = <HTMLInputElement>this.getFormInput(controls.shoesSizeMx);
    this.type = <HTMLSelectElement>this.getFormInput(controls.type);
  }

  protected getFormInput(control: AppControl): HTMLElement {
    return <HTMLElement>document.getElementById(
      `${control.inputName}-${this.formIndex}`
    );
  }

  protected getDataInfoSelector(name: string): string {
    return `[data-info="${name}"]`;
  }

  protected getMerchSizes(sizes: string): string[] {
    if (sizes.length) {
      if (sizes.includes(',')) return sizes.split(',');
      return [sizes];
    }

    return [''];
  }

  protected setMerchCommonValue(
    template: HTMLElement, nameValue: string, formValue: string, boxName?: string
  ): void {
    const boxSelector = this.getDataInfoSelector(boxName || `${nameValue}-box`);
    const sizeValueSelector = this.getDataInfoSelector(`${nameValue}-value`);
    const box = <HTMLElement>template.querySelector(boxSelector);
    const sizeValue = <HTMLInputElement>template.querySelector(sizeValueSelector);
    const value = formValue.trim();

    if (value && value !== 'NaN') {
      sizeValue.textContent = value;
    } else {
      box.classList.add('d-none');
    }
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

  protected setMerchImage(template: HTMLElement, image: File): Promise<void> {
    return new Promise(async (resolve) => {
      const imageSelector = this.getDataInfoSelector(controls.file.name);
      const imageTemplate = <HTMLImageElement>template.querySelector(imageSelector);
      const imageSourceURL = await this.getBase64ImgFromFile(image);
      imageTemplate.onload = () => resolve();
      imageTemplate.src = imageSourceURL;
    });
  }

  protected setMerchBadgePosition(template: HTMLElement, bottomRight?: boolean): void {
    const logo = <HTMLImageElement>template.getElementsByClassName('brand__image')[0];
    const logoPosition = <BadgePosition>parseInt(this.badgePosition.value);
    const classPositionNames: Record<BadgePosition, string> = {
      [BadgePosition.bottomLeft]: 'brand__image--bottom-left',
      [BadgePosition.bottomRight]: 'brand__image--bottom-right',
      [BadgePosition.topLeft]: 'brand__image--top-left',
      [BadgePosition.topRight]: 'brand__image--top-right'
    };
    const logoPositionClass = bottomRight ?
      classPositionNames[BadgePosition.bottomRight] :
      classPositionNames[logoPosition];

    logo.classList.add(logoPositionClass);
  }

  protected setMerchIdentification(template: HTMLElement): void {
    this.setMerchCommonValue(template, controls.identification.name, this.identification.value);
  }

  protected setMerchPrice(template: HTMLElement): void {
    this.setMerchCommonValue(template, controls.price.name, this.price.value);
  }
}

export class Merch extends MerchBase {
  private imageProcessCounter: number;

  constructor(formIndex: string, private batchTimestamp: number) {
    super(formIndex);

    this.imageProcessCounter = 1;
  }

  private renderTemplateInDom(template: HTMLElement): HTMLElement {
    const renderBox = <HTMLElement>document.getElementById('template-rendering-box');
    return renderBox.appendChild(template);
  }

  public async processingImages(template: HTMLElement): Promise<ProcessedImage> {
    const templateInDom = this.renderTemplateInDom(template);
    const canvasSize = 800;
    const canvas = await html2canvas(templateInDom, {
      width: canvasSize,
      height: canvasSize,
      scale: 2
    });
    const base64ImageURL = canvas.toDataURL('image/jpeg', 0.8);
    const base64Response = await fetch(base64ImageURL);
    const processedImage: ProcessedImage = {
      name: `${this.formIndex}-${this.imageProcessCounter}-${this.batchTimestamp}-processed.jpeg`,
      input: base64Response,
      lastModified: dayjs.unix(this.batchTimestamp).toDate()
    };
    this.imageProcessCounter += 1;

    // template.remove();
    // templateInDom.remove();
    // canvas.remove();
    // URL.revokeObjectURL(base64ImageURL);

    return processedImage;
  }

  private async createImageTypeGeneral(image: File): Promise<ProcessedImage[]> {
    const generalTemplate = <HTMLElement>document.getElementById('template-general');
    const template = <HTMLElement>generalTemplate.cloneNode(true);
    const processedImages: ProcessedImage[] = [];

    await this.setMerchImage(template, image);
    this.setMerchBadgePosition(template);
    this.setMerchIdentification(template);
    processedImages.push(await this.processingImages(template));

    return processedImages;
  }

  private async createImageTypeShirt(image: File): Promise<ProcessedImage[]> {
    const shirtTemplate = <HTMLElement>document.getElementById('template-shirt');
    const merchSizes = this.getMerchSizes(this.shirtSize.value);
    const sizeName = controls.shirtSize.name;
    const sizeDescName = controls.shirtSizeDescription.name;
    const sizeDescVal = this.shirtSizeDescription.value;
    const processedImages: ProcessedImage[] = [];

    for (const merchSize of merchSizes) {
      const template = <HTMLElement>shirtTemplate.cloneNode(true);

      await this.setMerchImage(template, image);
      this.setMerchBadgePosition(template, true);
      this.setMerchPrice(template);
      this.setMerchIdentification(template);
      this.setMerchCommonValue(
        template,
        sizeName,
        merchSize,
        `${sizeName}-value-box`
      );
      this.setMerchCommonValue(
        template,
        sizeDescName,
        sizeDescVal,
        `${sizeDescName}-value`
      );

      if (!merchSize && !sizeDescVal) {
        this.setMerchCommonValue(template, sizeDescName, '', `${sizeName}-box`);
      }

      processedImages.push(await this.processingImages(template));
    }

    return processedImages;
  }

  private async createImageTypePant(image: File): Promise<ProcessedImage[]> {
    const pantTemplate = <HTMLElement>document.getElementById('template-pant');
    const merchSizes = this.getMerchSizes(this.pantSize.value);
    const processedImages: ProcessedImage[] = [];

    for (const merchSize of merchSizes) {
      const template = <HTMLElement>pantTemplate.cloneNode(true);

      await this.setMerchImage(template, image);
      this.setMerchBadgePosition(template, true);
      this.setMerchPrice(template);
      this.setMerchIdentification(template);
      this.setMerchCommonValue(template, controls.pantSize.name, merchSize);
      this.setMerchCommonValue(template, controls.pantCourt.name, this.pantCourt.value);
      this.setMerchCommonValue(template, controls.pantColor.name, this.pantColor.value);
      processedImages.push(await this.processingImages(template));
    }

    return processedImages;
  }

  private async createImageTypeShoes(image: File): Promise<ProcessedImage[]> {
    const shoesTemplate = <HTMLElement>document.getElementById('template-shoes');
    const merchMxSizes = this.getMerchSizes(this.shoesSizeMx.value);
    const merchUsSizes = this.getMerchSizes(this.shoesSizeUs.value);
    const boxName = 'shoes-size-box';
    const maxSizeValues = Math.max(merchMxSizes.length, merchUsSizes.length);
    const processedImages: ProcessedImage[] = [];

    for (let i = 0; i < maxSizeValues; i++) {
      const template = <HTMLElement>shoesTemplate.cloneNode(true);
      const mxSize = merchMxSizes[i] || '';
      const usSize = merchUsSizes[i] || '';

      await this.setMerchImage(template, image);
      this.setMerchBadgePosition(template, true);
      this.setMerchPrice(template);
      this.setMerchIdentification(template);
      this.setMerchCommonValue(template, controls.shoesSizeMx.name, (mxSize || (parseInt(usSize) - 2).toString()), boxName);
      this.setMerchCommonValue(template, controls.shoesSizeUs.name, (usSize || (parseInt(mxSize) + 2).toString()), boxName);
      processedImages.push(await this.processingImages(template));
    }

    return processedImages;
  }

  public async createImages(): Promise<ProcessedImage[]> {
    if (!this.file.files?.length) return [];

    const images = Array.from(<FileList>this.file.files);
    const processedImages: ProcessedImage[] = [];
    const templates: Record<string, (image: File) => Promise<ProcessedImage[]>> = {
      [formTypes.general]: (image: File) => this.createImageTypeGeneral(image),
      [formTypes.shirt]: (image: File) => this.createImageTypeShirt(image),
      [formTypes.pant]: (image: File) => this.createImageTypePant(image),
      [formTypes.shoes]: (image: File) => this.createImageTypeShoes(image)
    };
    const createImage = templates[this.type.value];

    for (const image of images) {
      const processedImg = await createImage(image);
      processedImages.push(...processedImg);
    }

    return processedImages;
  }
}