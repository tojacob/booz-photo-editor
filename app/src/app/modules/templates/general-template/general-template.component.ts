import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { LabelPosition, GeneralEditor } from 'src/app/interfaces/editor.interfaces';
import { ImageResolution } from 'src/app/interfaces/processor.interfaces';
import { TermplateService } from '../termplate.service';

@Component({
  selector: 'app-general-template',
  templateUrl: './general-template.component.html',
  styleUrls: ['./general-template.component.scss']
})
export class GeneralTemplateComponent implements AfterViewInit {
  private readonly bootstrapedSubject = new ReplaySubject<HTMLElement>(1);
  public readonly bootstraped$ = this.bootstrapedSubject.asObservable();

  @Input() public data: GeneralEditor = {
    file: "assets/merch-test-3.jpg",
    id: "99",
    logoLabelPosition: LabelPosition.bottomRight,
    whatsappFilter: false
  };

  @Input() public resolution: ImageResolution = {
    width: "800px",
    height: "800px"
  };

  public get logoLabelPositionStyle(): string {
    return this.templateService.labelPositions[this.data.logoLabelPosition];
  }

  constructor(
    private elRef: ElementRef,
    private templateService: TermplateService
  ) { }

  public ngOnInit(): void { }

  public ngAfterViewInit(): void {
    const nativeElement = <HTMLElement>this.elRef.nativeElement;
    const template = <HTMLElement>nativeElement.querySelector("#template");

    this.bootstrapedSubject.next(template);
  }
}
