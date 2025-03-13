import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TourService } from '../../modules/tour/services/tour.service';
import { Tour, TourContent, TourType, TourStatus } from '../../modules/tour/models/tour.interface';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="dashboard">
      <div class="stats-section" id="stats-section">
        <div class="stat-card">
          <h3>Users</h3>
          <p>1,234</p>
        </div>
        <div class="stat-card">
          <h3>Revenue</h3>
          <p>$5,678</p>
        </div>
        <div class="stat-card">
          <h3>Orders</h3>
          <p>890</p>
        </div>
      </div>

      <div class="actions-section" id="actions-section">
        <div class="dropdown">
          <select [(ngModel)]="selectedPeriod">
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
        <button (click)="refreshData()">Refresh Data</button>
      </div>

      <div class="chart-section" id="chart-section">
        <div class="chart-placeholder">
          [Chart Visualization]
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      padding: 20px;
    }
    .stats-section {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 20px;
    }
    .stat-card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .actions-section {
      margin-bottom: 20px;
      display: flex;
      gap: 10px;
    }
    .chart-section {
      background: white;
      padding: 20px;
      border-radius: 8px;
      min-height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `]
})
export class DashboardComponent {
  selectedPeriod = 'day';

  constructor(private tourService: TourService) {}

  refreshData() {
    console.log('Refreshing data for period:', this.selectedPeriod);
  }

  startDashboardTour() {
    const tour: Tour = {
      id: 1,
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
        tourId: 1,
        title: 'Statistics Overview',
        content: 'Here you can see key metrics at a glance',
        step: 1,
        display: true
      },
      {
        id: 2,
        tourId: 1,
        title: 'Time Period Selection',
        content: 'Select different time periods to view data',
        step: 2,
        display: true
      },
      {
        id: 3,
        tourId: 1,
        title: 'Data Visualization',
        content: 'View your data in beautiful charts',
        step: 3,
        display: true
      }
    ];

    this.tourService.startTour(tour, contents);
  }
} 