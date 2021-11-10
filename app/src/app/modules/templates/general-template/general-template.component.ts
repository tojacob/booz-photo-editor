import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LabelPosition, GeneralEditor } from 'src/app/interfaces/editor.interfaces';
import { TermplateService } from '../termplate.service';

@Component({
  selector: 'app-general-template',
  templateUrl: './general-template.component.html',
  styleUrls: ['./general-template.component.scss']
})
export class GeneralTemplateComponent implements OnInit, AfterViewInit {
  public merch: GeneralEditor = {
    file: "assets/merch-test-3.jpg",
    id: "99",
    logoLabelPosition: LabelPosition.bottomRight,
    whatsappFilter: false
  };

  @Input() public set data(data: GeneralEditor) {
    if (!data) return;
    this.merch = data;
  }

  @Output() public mounted = new EventEmitter<HTMLElement>();

  public get logoLabelPositionStyle(): string {
    return this.templateService.labelPositions[this.merch.logoLabelPosition];
  }

  constructor(
    private elRef: ElementRef,
    private templateService: TermplateService
  ) { }

  public ngOnInit(): void { }

  public ngAfterViewInit(): void {
    const nativeElement = <HTMLElement>this.elRef.nativeElement;
    const template = <HTMLElement>nativeElement.querySelector("#template");

    this.mounted.emit(template);
  }
}
