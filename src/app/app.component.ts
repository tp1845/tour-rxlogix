import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { TourStepComponent } from './modules/tour/components/tour-step.component';
import { TourService } from './modules/tour/services/tour.service';
import { Tour, TourContent, TourType, TourStatus } from './modules/tour/models/tour.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NavComponent, TourStepComponent],
  template: `
    <app-nav></app-nav>
    <router-outlet></router-outlet>
    <app-tour-step></app-tour-step>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background: #f5f5f5;
    }
  `]
})
export class AppComponent {
  constructor(private tourService: TourService) {}

  startStepTour() {
    const tour: Tour = {
      id: 1,
      type: TourType.Tour,
      title: 'Feature Tour',
      description: 'Learn about our features',
      lang: 'en',
      module: 1,
      status: TourStatus.Using
    };

    const contents: TourContent[] = [
      {
        id: 1,
        tourId: 1,
        title: 'Welcome',
        content: 'Welcome to our feature tour!',
        step: 1,
        display: true
      },
      {
        id: 2,
        tourId: 1,
        title: 'Feature 1',
        content: 'This is our first amazing feature',
        step: 2,
        display: true
      },
      {
        id: 3,
        tourId: 1,
        title: 'Feature 2',
        content: 'This is our second feature',
        step: 3,
        display: true
      }
    ];

    this.tourService.startTour(tour, contents);
  }

  startVideoTour() {
    const tour: Tour = {
      id: 2,
      type: TourType.Video,
      title: 'Video Tutorial',
      description: 'Watch our guide',
      lang: 'en',
      module: 1,
      status: TourStatus.Using
    };

    const contents: TourContent[] = [
      {
        id: 5,
        tourId: 2,
        title: 'Video Guide',
        content: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        step: 1,
        display: true
      }
    ];

    this.tourService.startTour(tour, contents);
  }
}