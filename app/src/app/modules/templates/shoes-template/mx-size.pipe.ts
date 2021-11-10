import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mxSize'
})
export class MxSizePipe implements PipeTransform {

  transform(value: string): unknown {
    const us = parseInt(value);
    const mx = us - 2;

    return mx.toString();
  }
}
