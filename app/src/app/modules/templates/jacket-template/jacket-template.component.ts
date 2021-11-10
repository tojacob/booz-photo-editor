import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JacketEditor, LabelPosition } from 'src/app/interfaces/editor.interfaces';
import { TermplateService } from '../termplate.service';

@Component({
  selector: 'app-jacket-template',
  templateUrl: './jacket-template.component.html',
  styleUrls: ['./jacket-template.component.scss']
})
export class JacketTemplateComponent implements OnInit, AfterViewInit {
  public merch: JacketEditor = {
    file: "assets/merch-test-3.jpg",
    id: "99",
    logoLabelPosition: LabelPosition.topRight,
    whatsappFilter: false,
    sizes: "XL",
    sizeDescription: "VIENE A LA MEDIDA",
    price: 1200,
    offerPrice: 900,
    offerLabelPosition: LabelPosition.none
  };

  @Input() public set data(data: JacketEditor) {
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
