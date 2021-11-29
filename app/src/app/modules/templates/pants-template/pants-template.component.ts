import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { LabelPosition, PantsEditor } from 'src/app/interfaces/editor.interfaces';
import { ImageResolution } from 'src/app/interfaces/processor.interfaces';
import { TermplateService } from '../termplate.service';

@Component({
  selector: 'app-pants-template',
  templateUrl: './pants-template.component.html',
  styleUrls: ['./pants-template.component.scss']
})
export class PantsTemplateComponent implements AfterViewInit {
  private readonly bootstrapedSubject = new ReplaySubject<HTMLElement>(1);
  public readonly bootstraped$ = this.bootstrapedSubject.asObservable();

  @Input() public data: PantsEditor = {
    file: "assets/merch-test-4.jpg",
    id: "99",
    logoLabelPosition: LabelPosition.bottomRight,
    whatsappFilter: false,
    size: "XL",
    court: "Moderno",
    color: "Vainilla metalico",
    price: 1200,
    offerPrice: 900,
    offerLabelPosition: LabelPosition.none
  };

  @Input() public resolution: ImageResolution = {
    width: "800px",
    height: "800px"
  };

  public get logoLabelPositionStyle(): string {
    return this.templateService.labelPositions[this.data.logoLabelPosition];
  }

  public get offerLabelPositionStyle(): string {
    return this.templateService.labelPositions[this.data.offerLabelPosition];
  }

  constructor(
    private elRef: ElementRef,
    private templateService: TermplateService
  ) { }

  public ngAfterViewInit(): void {
    const nativeElement = <HTMLElement>this.elRef.nativeElement;
    const template = <HTMLElement>nativeElement.querySelector("#template");

    this.bootstrapedSubject.next(template);
  }
}
