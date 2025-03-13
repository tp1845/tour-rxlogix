import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourStepComponent } from './components/tour-step.component';
import { SafePipe } from './pipes/safe.pipe';

@NgModule({
  declarations: [
    TourStepComponent,
    SafePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TourStepComponent
  ]
})
export class TourModule { }