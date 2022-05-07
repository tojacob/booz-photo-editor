import { FormGroup } from "@angular/forms";

export enum EditorType {
  general = 100,
  shirt = 200,
  jacket = 300,
  pants = 400,
  shoes = 500,
  accessory = 600
}

export enum LabelPosition {
  none = 0,
  topRight = 100,
  bottomRight = 200,
  topLeft = 300,
  bottomLeft = 400
}

export interface Editor {
  type: EditorType;
  form: FormGroup;
}

export interface GeneralEditor {
  file: null | string | FileList;
  id: string;
  logoLabelPosition: LabelPosition;
  whatsappFilter: boolean;
}

export interface ShirtEditor {
  file: null | string | FileList;
  id: string;
  logoLabelPosition: LabelPosition;
  whatsappFilter: boolean;
  size: string;
  sizeDescription: string;
  price: string;
  offerPrice: string;
  offerLabelPosition: LabelPosition;
}

export interface JacketEditor {
  file: null | string | FileList;
  id: string;
  logoLabelPosition: LabelPosition;
  whatsappFilter: boolean;
  size: string;
  sizeDescription: string;
  price: string;
  offerPrice: string;
  offerLabelPosition: LabelPosition;
}

export interface PantsEditor {
  file: null | string | FileList;
  id: string;
  logoLabelPosition: LabelPosition;
  whatsappFilter: boolean;
  size: string;
  court: string;
  color: string;
  price: string;
  offerPrice: string;
  offerLabelPosition: LabelPosition;
}

export interface ShoesEditor {
  file: null | string | FileList;
  id: string;
  logoLabelPosition: LabelPosition;
  whatsappFilter: boolean;
  size: string;
  price: string;
  offerPrice: string;
  offerLabelPosition: LabelPosition;
}

export interface AccessoryEditor {
  file: null | string | FileList;
  id: string;
  logoLabelPosition: LabelPosition;
  whatsappFilter: boolean;
  quantity: string;
  quantityDescription: string;
  price: string;
  offerPrice: string;
  offerLabelPosition: LabelPosition;
}