export interface AppControl {
  name: string;
  containerSelector: string;
  inputName: string;
}

export interface AppControls {
  [key: string]: AppControl;
  badgePosition: AppControl;
  file: AppControl;
  identification: AppControl;
  pantCourt: AppControl;
  pantColor: AppControl;
  pantSize: AppControl;
  price: AppControl;
  shirtSize: AppControl;
  shirtSizeDescription: AppControl;
  shoesSizeUs: AppControl;
  shoesSizeMx: AppControl;
  type: AppControl;
}

export interface ProcessedImage {
  input: Response;
  name: string;
  lastModified: Date;
}

export enum BadgePosition {
  topRight = 100,
  bottomRight = 200,
  topLeft = 300,
  bottomLeft = 400
}