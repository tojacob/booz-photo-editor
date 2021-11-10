import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LabelPosition, ShoesEditor } from 'src/app/interfaces/editor.interfaces';
import { TermplateService } from '../termplate.service';

@Component({
  selector: 'app-shoes-template',
  templateUrl: './shoes-template.component.html',
  styleUrls: ['./shoes-template.component.scss']
})
export class ShoesTemplateComponent implements OnInit, AfterViewInit {
  public merch: ShoesEditor = {
    file: "assets/merch-test-5.jpg",
    id: "99",
    logoLabelPosition: LabelPosition.bottomRight,
    whatsappFilter: false,
    sizes: "10",
    price: 1200,
    offerPrice: 900,
    offerLabelPosition: LabelPosition.none
  };

  @Input() public set data(data: ShoesEditor) {
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
