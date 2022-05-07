import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { JacketEditor, LabelPosition } from 'src/app/interfaces/editor.interfaces';
import { ImageResolution } from 'src/app/interfaces/processor.interfaces';
import { TermplateService } from '../termplate.service';

@Component({
  selector: 'app-jacket-template',
  templateUrl: './jacket-template.component.html',
  styleUrls: ['./jacket-template.component.scss']
})
export class JacketTemplateComponent implements AfterViewInit {
  private readonly bootstrapedSubject = new ReplaySubject<HTMLElement>(1);
  public readonly bootstraped$ = this.bootstrapedSubject.asObservable();

  @Input() public data: JacketEditor = {
    file: "assets/merch-test-3.jpg",
    id: "99",
    logoLabelPosition: LabelPosition.topRight,
    whatsappFilter: false,
    size: "XL",
    sizeDescription: "VIENE A LA MEDIDA",
    price: "1200",
    offerPrice: "900",
    offerLabelPosition: LabelPosition.bottomLeft
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
