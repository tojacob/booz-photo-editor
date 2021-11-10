import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LabelPosition, ShirtEditor } from 'src/app/interfaces/editor.interfaces';
import { TermplateService } from '../termplate.service';

@Component({
  selector: 'app-shirt-template',
  templateUrl: './shirt-template.component.html',
  styleUrls: ['./shirt-template.component.scss']
})
export class ShirtTemplateComponent implements OnInit, AfterViewInit {
  public merch: ShirtEditor = {
    file: "assets/merch-test-2.jpg",
    id: "99",
    logoLabelPosition: LabelPosition.bottomRight,
    whatsappFilter: false,
    sizes: "XL",
    sizeDescription: "Viene a la medida",
    price: 1200,
    offerPrice: 900,
    offerLabelPosition: LabelPosition.none,
  };

  @Input() public set data(data: ShirtEditor) {
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
