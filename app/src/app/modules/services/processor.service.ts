import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ProcessedImage } from 'src/app/interfaces/processor.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProcessorService {
  private readonly processedImages: ProcessedImage[] = [];
  private readonly processedSubject = new Subject<void>();
  public readonly processed$ = this.processedSubject.asObservable();

  constructor() { }

  public sendProcessedImages(images: ProcessedImage[]): void {
    this.processedImages.push(...images);
    this.processedSubject.next(void 0);
  }

  public getProcessedImages(): ProcessedImage[] {
    return this.processedImages;
  }
}
