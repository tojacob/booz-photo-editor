import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { LabelPosition, ShoesEditor } from 'src/app/interfaces/editor.interfaces';
import { ImageResolution } from 'src/app/interfaces/processor.interfaces';
import { TermplateService } from '../termplate.service';

@Component({
  selector: 'app-shoes-template',
  templateUrl: './shoes-template.component.html',
  styleUrls: ['./shoes-template.component.scss']
})
export class ShoesTemplateComponent implements AfterViewInit {
  private readonly bootstrapedSubject = new ReplaySubject<HTMLElement>(1);
  public readonly bootstraped$ = this.bootstrapedSubject.asObservable();

  @Input() public data: ShoesEditor = {
    file: "assets/merch-test-5.jpg",
    id: "99",
    logoLabelPosition: LabelPosition.bottomRight,
    whatsappFilter: false,
    size: "10",
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
