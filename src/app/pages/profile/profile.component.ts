import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TourService } from '../../modules/tour/services/tour.service';
import { Tour, TourContent, TourType, TourStatus } from '../../modules/tour/models/tour.interface';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="profile-container">
      <div class="profile-header" id="profile-header">
        <div class="profile-avatar">
          <img src="https://via.placeholder.com/150" alt="Profile Avatar" />
          <button class="change-avatar-btn" id="change-avatar">Change Photo</button>
        </div>
        <div class="profile-info">
          <h2>John Doe</h2>
          <span class="profile-role">Administrator</span>
        </div>
      </div>

      <div class="profile-content">
        <div class="profile-section" id="personal-info">
          <h3>Personal Information</h3>
          <div class="form-group">
            <label>Full Name</label>
            <input type="text" [(ngModel)]="profile.fullName" />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" [(ngModel)]="profile.email" />
          </div>
          <div class="form-group">
            <label>Phone</label>
            <input type="tel" [(ngModel)]="profile.phone" />
          </div>
        </div>

        <div class="profile-section" id="account-settings">
          <h3>Account Settings</h3>
          <div class="form-group">
            <label>Language</label>
            <select [(ngModel)]="profile.language">
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>
          <div class="form-group">
            <label>Time Zone</label>
            <select [(ngModel)]="profile.timezone">
              <option value="UTC">UTC</option>
              <option value="EST">EST</option>
              <option value="PST">PST</option>
            </select>
          </div>
        </div>

        <div class="profile-section" id="security">
          <h3>Security</h3>
          <div class="form-group">
            <label>Current Password</label>
            <input type="password" [(ngModel)]="profile.currentPassword" />
          </div>
          <div class="form-group">
            <label>New Password</label>
            <input type="password" [(ngModel)]="profile.newPassword" />
          </div>
          <div class="form-group">
            <label>Confirm Password</label>
            <input type="password" [(ngModel)]="profile.confirmPassword" />
          </div>
        </div>

        <div class="action-buttons">
          <button class="save-btn" id="profile-save-btn" (click)="saveProfile()">Save Changes</button>
          <button class="tour-btn" (click)="startProfileTour()">Start Profile Tour</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }

    .profile-header {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-bottom: 30px;
      padding: 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .profile-avatar {
      position: relative;
      width: 150px;
    }

    .profile-avatar img {
      width: 100%;
      border-radius: 50%;
    }

    .change-avatar-btn {
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      padding: 5px 10px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.8rem;
    }

    .profile-info h2 {
      margin: 0;
      color: #333;
    }

    .profile-role {
      color: #666;
    }

    .profile-section {
      background: white;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .form-group {
      margin-bottom: 15px;
    }

    .form-group label {
      display: block;
      margin-bottom: 5px;
      color: #666;
    }

    .form-group input,
    .form-group select {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .action-buttons {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
    }

    .save-btn,
    .tour-btn {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .save-btn {
      background: #007bff;
      color: white;
    }

    .tour-btn {
      background: #6c757d;
      color: white;
    }
  `]
})
export class ProfileComponent {
  profile = {
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 890',
    language: 'en',
    timezone: 'UTC',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  constructor(private tourService: TourService) {}

  saveProfile() {
    console.log('Saving profile:', this.profile);
  }

  startProfileTour() {
    const tour: Tour = {
      id: 3,
      type: TourType.Tour,
      title: 'Profile Tour',
      description: 'Learn about your profile settings',
      lang: 'en',
      module: 1,
      status: TourStatus.Using
    };

    const contents: TourContent[] = [
      {
        id: 1,
        tourId: 3,
        title: 'Profile Overview',
        content: 'This is your profile section where you can manage your personal information',
        step: 1,
        display: true
      },
      {
        id: 2,
        tourId: 3,
        title: 'Personal Information',
        content: 'Update your personal details including name, email, and phone number',
        step: 2,
        display: true
      },
      {
        id: 3,
        tourId: 3,
        title: 'Account Settings',
        content: 'Customize your account settings like language and timezone',
        step: 3,
        display: true
      },
      {
        id: 4,
        tourId: 3,
        title: 'Security Settings',
        content: 'Manage your password and security settings here',
        step: 4,
        display: true
      }
    ];

    this.tourService.startTour(tour, contents);
  }
} 