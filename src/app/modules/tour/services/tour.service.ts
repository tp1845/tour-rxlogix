import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Tour, TourContent } from '../models/tour.interface';

@Injectable({
  providedIn: 'root'
})
export class TourService {
  private currentTourSubject = new BehaviorSubject<Tour | null>(null);
  private currentStepSubject = new BehaviorSubject<number>(0);
  private tourContentsSubject = new BehaviorSubject<TourContent[]>([]);

  currentTour$ = this.currentTourSubject.asObservable();
  currentStep$ = this.currentStepSubject.asObservable();
  tourContents$ = this.tourContentsSubject.asObservable();

  constructor(private router: Router) {}

  async startTour(tour: Tour, contents: TourContent[], requiredPath?: string) {
    // If a path is required, navigate to it first
    if (requiredPath) {
      await this.router.navigate([requiredPath]);
      // Small delay to ensure components are rendered
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    this.currentTourSubject.next(tour);
    this.tourContentsSubject.next(contents.filter(c => c.display));
    this.currentStepSubject.next(0);
  }

  nextStep() {
    const currentStep = this.currentStepSubject.value;
    const contents = this.tourContentsSubject.value;
    if (currentStep < contents.length - 1) {
      this.currentStepSubject.next(currentStep + 1);
    }
  }

  previousStep() {
    const currentStep = this.currentStepSubject.value;
    if (currentStep > 0) {
      this.currentStepSubject.next(currentStep - 1);
    }
  }

  endTour() {
    this.currentTourSubject.next(null);
    this.currentStepSubject.next(0);
    this.tourContentsSubject.next([]);
  }
}