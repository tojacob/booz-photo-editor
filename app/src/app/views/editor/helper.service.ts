import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AccessoryEditor, Editor, EditorType, GeneralEditor, JacketEditor, LabelPosition, PantsEditor, ShirtEditor, ShoesEditor } from 'src/app/interfaces/editor.interfaces';

interface BadgePositionMap { name: string, value: LabelPosition; };

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  private readonly editorTypes: Record<any, () => Editor> = {
    [EditorType.general]: (): Editor => ({
      type: EditorType.general,
      form: this.fb.group(<GeneralEditor>{
        file: null,
        id: "",
        logoLabelPosition: LabelPosition.bottomRight,
        whatsappFilter: false
      })
    }),
    [EditorType.shirt]: (): Editor => ({
      type: EditorType.shirt,
      form: this.fb.group(<ShirtEditor>{
        file: null,
        id: "",
        logoLabelPosition: LabelPosition.bottomRight,
        whatsappFilter: false,
        size: "",
        sizeDescription: "",
        price: "",
        offerPrice: "",
        offerLabelPosition: LabelPosition.none
      })
    }),
    [EditorType.jacket]: (): Editor => ({
      type: EditorType.jacket,
      form: this.fb.group(<JacketEditor>{
        file: null,
        id: "",
        logoLabelPosition: LabelPosition.topRight,
        whatsappFilter: false,
        size: "",
        sizeDescription: "",
        price: "",
        offerPrice: "",
        offerLabelPosition: LabelPosition.none
      })
    }),
    [EditorType.pants]: (): Editor => ({
      type: EditorType.pants,
      form: this.fb.group(<PantsEditor>{
        file: null,
        id: "",
        logoLabelPosition: LabelPosition.bottomRight,
        whatsappFilter: false,
        size: "",
        court: "",
        color: "",
        price: "",
        offerPrice: "",
        offerLabelPosition: LabelPosition.none
      })
    }),
    [EditorType.shoes]: (): Editor => ({
      type: EditorType.shoes,
      form: this.fb.group(<ShoesEditor>{
        file: null,
        id: "",
        logoLabelPosition: LabelPosition.bottomRight,
        whatsappFilter: false,
        size: "",
        price: "",
        offerPrice: "",
        offerLabelPosition: LabelPosition.none
      })
    }),
    [EditorType.accessory]: (): Editor => ({
      type: EditorType.accessory,
      form: this.fb.group(<AccessoryEditor>{
        file: null,
        id: "",
        logoLabelPosition: LabelPosition.bottomRight,
        whatsappFilter: false,
        quantity: "",
        quantityDescription: "",
        price: "",
        offerPrice: "",
        offerLabelPosition: LabelPosition.none
      })
    }),
  };

  public readonly labelPositions: BadgePositionMap[] = [
    { name: "Desactivar", value: LabelPosition.none },
    { name: "Superior izquierdo", value: LabelPosition.topLeft },
    { name: "Superior derecho", value: LabelPosition.topRight },
    { name: "Inferior derecho", value: LabelPosition.bottomRight },
    { name: "Inferior izquierdo", value: LabelPosition.bottomLeft }
  ];

  constructor(private fb: FormBuilder) { }

  public getNewEditor(type: EditorType): Editor {
    return this.editorTypes[type]();
  }
}
