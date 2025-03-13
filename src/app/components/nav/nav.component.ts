import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TourService } from '../../modules/tour/services/tour.service';
import { Tour, TourContent, TourType, TourStatus } from '../../modules/tour/models/tour.interface';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar">
      <div class="brand" id="nav-brand">Demo App</div>
      <div class="nav-items">
        <a routerLink="/dashboard" routerLinkActive="active" id="nav-dashboard">Dashboard</a>
        <a routerLink="/settings" routerLinkActive="active" id="nav-settings">Settings</a>
        <a routerLink="/profile" routerLinkActive="active" id="nav-profile">Profile</a>
        
        <div class="tour-dropdown" id="tour-dropdown">
          <button class="tour-btn" (click)="isDropdownOpen = !isDropdownOpen">
            Start Tours ▼
          </button>
          <div class="dropdown-content" *ngIf="isDropdownOpen">
            <a (click)="startAppTour()">App Overview Tour</a>
            <a (click)="startDashboardTour()">Dashboard Tour</a>
            <a (click)="startSettingsTour()">Settings Tour</a>
            <a (click)="startProfileTour()">Profile Tour</a>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background: #333;
      padding: 1rem;
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .brand {
      font-size: 1.5rem;
      font-weight: bold;
    }
    .nav-items {
      display: flex;
      gap: 1rem;
      align-items: center;
    }
    a {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
    }
    a.active {
      background: #555;
    }
    .tour-dropdown {
      position: relative;
    }
    .tour-btn {
      background: #007bff;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
    }
    .dropdown-content {
      position: absolute;
      top: 100%;
      right: 0;
      background: white;
      min-width: 200px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      border-radius: 4px;
      z-index: 1000;
    }
    .dropdown-content a {
      color: #333;
      padding: 10px 15px;
      display: block;
    }
    .dropdown-content a:hover {
      background: #f5f5f5;
    }
  `]
})
export class NavComponent {
  isDropdownOpen = false;

  constructor(private tourService: TourService) {}

  startAppTour() {
    const tour: Tour = {
      id: 1,
      type: TourType.Tour,
      title: 'App Overview Tour',
      description: 'Learn about the main features of our app',
      lang: 'en',
      module: 1,
      status: TourStatus.Using
    };

    const contents: TourContent[] = [
      {
        id: 1,
        tourId: 1,
        title: 'App Brand',
        content: 'Welcome to our app! This is our brand logo.',
        step: 1,
        display: true
      },
      {
        id: 2,
        tourId: 1,
        title: 'Dashboard Navigation',
        content: 'Click here to access your dashboard with key metrics and statistics.',
        step: 2,
        display: true
      },
      {
        id: 3,
        tourId: 1,
        title: 'Settings Navigation',
        content: 'Access your app settings and preferences here.',
        step: 3,
        display: true
      },
      {
        id: 4,
        tourId: 1,
        title: 'Profile Navigation',
        content: 'Manage your profile and personal information in this section.',
        step: 4,
        display: true
      },
      {
        id: 5,
        tourId: 1,
        title: 'Tour Menu',
        content: 'You can start different feature tours from this menu anytime.',
        step: 5,
        display: true
      }
    ];

    this.isDropdownOpen = false;
    this.tourService.startTour(tour, contents, '/dashboard');
  }

  startDashboardTour() {
    const tour: Tour = {
      id: 2,
      type: TourType.Tour,
      title: 'Dashboard Tour',
      description: 'Learn about the dashboard features',
      lang: 'en',
      module: 1,
      status: TourStatus.Using
    };

    const contents: TourContent[] = [
      {
        id: 1,
        tourId: 2,
        title: 'Statistics Overview',
        content: 'View your key metrics at a glance.',
        step: 1,
        display: true
      },
      {
        id: 2,
        tourId: 2,
        title: 'Time Period Selection',
        content: 'Select different time periods to analyze your data.',
        step: 2,
        display: true
      },
      {
        id: 3,
        tourId: 2,
        title: 'Data Visualization',
        content: 'Interactive charts showing your performance over time.',
        step: 3,
        display: true
      }
    ];

    this.isDropdownOpen = false;
    this.tourService.startTour(tour, contents, '/dashboard');
  }

  startSettingsTour() {
    const tour: Tour = {
      id: 3,
      type: TourType.Tour,
      title: 'Settings Tour',
      description: 'Learn about available settings',
      lang: 'en',
      module: 1,
      status: TourStatus.Using
    };

    const contents: TourContent[] = [
      {
        id: 1,
        tourId: 3,
        title: 'Notification Settings',
        content: 'Configure how you want to receive notifications.',
        step: 1,
        display: true
      },
      {
        id: 2,
        tourId: 3,
        title: 'Theme Settings',
        content: 'Customize the appearance of the application.',
        step: 2,
        display: true
      },
      {
        id: 3,
        tourId: 3,
        title: 'Privacy Settings',
        content: 'Manage your privacy preferences and profile visibility.',
        step: 3,
        display: true
      }
    ];

    this.isDropdownOpen = false;
    this.tourService.startTour(tour, contents, '/settings');
  }

  startProfileTour() {
    const tour: Tour = {
      id: 4,
      type: TourType.Tour,
      title: 'Profile Tour',
      description: 'Learn about profile settings',
      lang: 'en',
      module: 1,
      status: TourStatus.Using
    };

    const contents: TourContent[] = [
      {
        id: 1,
        tourId: 4,
        title: 'Profile Overview',
        content: 'Your profile information and avatar.',
        step: 1,
        display: true
      },
      {
        id: 2,
        tourId: 4,
        title: 'Personal Information',
        content: 'Update your personal details here.',
        step: 2,
        display: true
      },
      {
        id: 3,
        tourId: 4,
        title: 'Account Settings',
        content: 'Manage your account preferences.',
        step: 3,
        display: true
      },
      {
        id: 4,
        tourId: 4,
        title: 'Security',
        content: 'Update your password and security settings.',
        step: 4,
        display: true
      },
      {
        id: 5,
        tourId: 4,
        title: 'Save Changes',
        content: 'Don\'t forget to save your changes when you\'re done!',
        step: 5,
        display: true
      }
    ];

    this.isDropdownOpen = false;
    this.tourService.startTour(tour, contents, '/profile');
  }
} 