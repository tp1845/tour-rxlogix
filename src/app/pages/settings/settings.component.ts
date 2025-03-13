import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="settings">
      <div class="settings-section" id="notification-settings">
        <h2>Notification Settings</h2>
        <div class="setting-item">
          <label>
            <input type="checkbox" [(ngModel)]="settings.emailNotifications">
            Email Notifications
          </label>
        </div>
        <div class="setting-item">
          <label>
            <input type="checkbox" [(ngModel)]="settings.pushNotifications">
            Push Notifications
          </label>
        </div>
      </div>

      <div class="settings-section" id="theme-settings">
        <h2>Theme Settings</h2>
        <div class="setting-item">
          <label>Theme</label>
          <select [(ngModel)]="settings.theme">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </div>
      </div>

      <div class="settings-section" id="privacy-settings">
        <h2>Privacy Settings</h2>
        <div class="setting-item">
          <label>
            <input type="checkbox" [(ngModel)]="settings.publicProfile">
            Public Profile
          </label>
        </div>
      </div>

      <button class="save-button" (click)="saveSettings()">Save Settings</button>
    </div>
  `,
  styles: [`
    .settings {
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
    }
    .settings-section {
      background: white;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 20px;
    }
    .setting-item {
      margin: 10px 0;
    }
    .save-button {
      width: 100%;
      padding: 10px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class SettingsComponent {
  settings = {
    emailNotifications: true,
    pushNotifications: false,
    theme: 'light',
    publicProfile: false
  };

  saveSettings() {
    console.log('Saving settings:', this.settings);
  }
} 