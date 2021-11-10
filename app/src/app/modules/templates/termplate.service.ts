import { Injectable } from '@angular/core';
import { LabelPosition } from 'src/app/interfaces/editor.interfaces';

@Injectable({
  providedIn: 'root'
})
export class TermplateService {
  public readonly labelPositions: Record<number, string> = {
    [LabelPosition.none]: "label-position-none",
    [LabelPosition.topLeft]: "label-position-top-left",
    [LabelPosition.topRight]: "label-position-top-right",
    [LabelPosition.bottomLeft]: "label-position-bot-left",
    [LabelPosition.bottomRight]: "label-position-bot-right",
  };

  constructor() { }
}
