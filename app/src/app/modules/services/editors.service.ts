import { Injectable } from '@angular/core';
import { Editor } from '../../interfaces/editor.interfaces';

@Injectable({
  providedIn: 'root'
})
export class EditorsService {
  public readonly content: Editor[] = [];

  constructor() { }

  public add(editor: Editor): void {
    this.content.push(editor);
  }

  public remove(index: number): void {
    this.content.splice(index, 1);
  }

  public get(index: number): Editor {
    return this.content[index];
  }
}
