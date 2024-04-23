import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberWithCommasPipe } from './number-with-commas.pipe';
import { TimePipe } from './time.pipe';
import { DatePipe } from './date.pipe';


@NgModule({
  declarations: [
    NumberWithCommasPipe,
    TimePipe,
    DatePipe,
  ],
  exports: [
    NumberWithCommasPipe,
    TimePipe,
    DatePipe,
  ],
  imports: [
    CommonModule
  ]
})
export class PipeModule { }