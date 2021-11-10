import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LabelPosition, PantsEditor } from 'src/app/interfaces/editor.interfaces';
import { TermplateService } from '../termplate.service';

@Component({
  selector: 'app-pants-template',
  templateUrl: './pants-template.component.html',
  styleUrls: ['./pants-template.component.scss']
})
export class PantsTemplateComponent implements OnInit, AfterViewInit {
  public merch: PantsEditor = {
    file: "assets/merch-test-4.jpg",
    id: "99",
    logoLabelPosition: LabelPosition.bottomRight,
    whatsappFilter: false,
    sizes: "XL",
    court: "Moderno",
    color: "Vainilla metalico",
    price: 1200,
    offerPrice: 900,
    offerLabelPosition: LabelPosition.none
  };

  @Input() public set data(data: PantsEditor) {
    if (!data) return;
    this.merch = data;
  }

  @Output() public mounted = new EventEmitter<HTMLElement>();

  public get logoLabelPositionStyle(): string {
    return this.templateService.labelPositions[this.merch.logoLabelPosition];
  }

  public get offerLabelPositionStyle(): string {
    return this.templateService.labelPositions[this.merch.offerLabelPosition];
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
