import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { Tour, TourContent, TourType, TourStatus } from '../models/tour.interface';
import { TourService } from '../services/tour.service';
import { SafePipe } from '../pipes/safe.pipe';

// Move interface outside of the class
interface ModalPosition {
  top: number;
  left: number;
  position: 'top' | 'bottom' | 'left' | 'right';
}

@Component({
  selector: 'app-tour-step',
  standalone: true,
  imports: [CommonModule, SafePipe],
  template: `
    <div class="tour-overlay" *ngIf="currentTour">
      <div class="tour-content" 
           [ngClass]="{'video-container': currentTour.type === 0}"
           [style.position]="currentTour.type === 1 ? 'absolute' : 'fixed'"
           [style.top.px]="modalPosition.top"
           [style.left.px]="modalPosition.left">
        <div class="tour-arrow" 
             [style.transform]="getArrowPosition()"
             *ngIf="currentTour.type === 1"></div>

        <div class="tour-header">
          <h2>{{ currentTour.title }}</h2>
          <button class="close-btn" (click)="end()">×</button>
        </div>

        <div [ngSwitch]="currentTour.type">
          <!-- Video Tour -->
          <div *ngSwitchCase="0" class="video-tour">
            <iframe 
              [src]="getCurrentContent()?.content || '' | safe"
              frameborder="0" 
              allowfullscreen
              width="100%"
              height="315">
            </iframe>
          </div>
          
          <!-- Step Tour -->
          <div *ngSwitchCase="1" class="step-tour">
            <h3>{{getCurrentContent()?.title}}</h3>
            <div class="tour-step-content" [innerHTML]="getCurrentContent()?.content"></div>
            <div class="tour-controls">
              <button 
                class="tour-btn" 
                (click)="previous()" 
                [disabled]="currentStep === 0">
                Previous
              </button>
              <span class="step-indicator">
                {{ currentStep + 1 }} / {{ tourContents.length }}
              </span>
              <button 
                class="tour-btn" 
                (click)="next()" 
                [disabled]="isLastStep">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .tour-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      z-index: 1000;
      pointer-events: none;
    }
    
    .tour-content {
      background: white;
      padding: 20px;
      border-radius: 8px;
      max-width: 300px;
      width: 90%;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      position: relative;
      pointer-events: all;
    }

    .tour-arrow {
      position: absolute;
      width: 0;
      height: 0;
      border: 10px solid transparent;
    }

    /* Arrow pointing right (modal on left of target) */
    .tour-arrow[style*="rotate(90deg)"] {
      right: -20px;
      top: 50%;
      transform: translateY(-50%);
      border-left-color: white;
    }

    /* Arrow pointing left (modal on right of target) */
    .tour-arrow[style*="rotate(-90deg)"] {
      left: -20px;
      top: 50%;
      transform: translateY(-50%);
      border-right-color: white;
    }

    /* Arrow pointing up (modal below target) */
    .tour-arrow[style*="rotate(0deg)"] {
      top: -20px;
      left: 50%;
      transform: translateX(-50%);
      border-bottom-color: white;
    }

    /* Arrow pointing down (modal above target) */
    .tour-arrow[style*="rotate(180deg)"] {
      bottom: -20px;
      left: 50%;
      transform: translateX(-50%);
      border-top-color: white;
    }

    .video-container {
      max-width: 800px;
      position: fixed !important;
      top: 50% !important;
      left: 50% !important;
      transform: translate(-50%, -50%) !important;
    }

    .tour-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      padding: 0;
      line-height: 1;
    }

    .tour-controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
    }

    .tour-btn {
      padding: 8px 16px;
      border: none;
      background-color: #007bff;
      color: white;
      border-radius: 4px;
      cursor: pointer;
    }

    .tour-btn:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }

    :host ::ng-deep .tour-target-highlight {
      position: relative;
      z-index: 1001;
      box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.4);
      border-radius: 4px;
      transition: box-shadow 0.3s ease;
    }

    :host ::ng-deep .tour-target-pulse {
      animation: tour-pulse 2s infinite;
    }

    @keyframes tour-pulse {
      0% {
        box-shadow: 0 0 0 0 rgba(0, 123, 255, 0.4);
      }
      70% {
        box-shadow: 0 0 0 6px rgba(0, 123, 255, 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(0, 123, 255, 0);
      }
    }
  `]
})
export class TourStepComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  currentTour: Tour | null = null;
  currentStep = 0;
  tourContents: TourContent[] = [];

  modalPosition: ModalPosition = {
    top: 0,
    left: 0,
    position: 'bottom'
  };
  
  constructor(private tourService: TourService) {}
  
  ngOnInit(): void {
    this.tourService.currentTour$
      .pipe(takeUntil(this.destroy$))
      .subscribe(tour => {
        this.currentTour = tour;
        if (tour) {
          setTimeout(() => this.updateModalPosition(), 0);
        }
      });
      
    this.tourService.currentStep$
      .pipe(takeUntil(this.destroy$))
      .subscribe(async step => {
        this.currentStep = step;
        await new Promise(resolve => setTimeout(resolve, 100));
        this.updateModalPosition();
      });
      
    this.tourService.tourContents$
      .pipe(takeUntil(this.destroy$))
      .subscribe(contents => {
        this.tourContents = contents;
        setTimeout(() => this.updateModalPosition(), 0);
      });

    window.addEventListener('resize', this.onResize);
    this.setupScrollListener();
  }

  private getTargetElement(): HTMLElement | null {
    const currentContent = this.getCurrentContent();
    if (!currentContent) return null;

    const stepToElementMap: { [key: string]: string } = {
      // App Overview Tour mappings
      'App Brand': 'nav-brand',
      'Dashboard Navigation': 'nav-dashboard',
      'Settings Navigation': 'nav-settings',
      'Profile Navigation': 'nav-profile',
      'Tour Menu': 'tour-dropdown',

      // Settings tour mappings
      'Notification Settings': 'notification-settings',
      'Theme Settings': 'theme-settings',
      'Privacy Settings': 'privacy-settings',

      // Profile tour mappings
      'Profile Overview': 'profile-header',
      'Personal Information': 'personal-info',
      'Account Settings': 'account-settings',
      'Security': 'security',
      'Save Changes': 'profile-save-btn',

      // Dashboard tour mappings
      'Statistics Overview': 'stats-section',
      'Time Period Selection': 'actions-section',
      'Data Visualization': 'chart-section',
    };

    const elementId = stepToElementMap[currentContent.title];
    return elementId ? document.getElementById(elementId) : null;
  }

  private updateModalPosition(): void {
    if (!this.currentTour) return;

    if (this.currentTour.type === 0) {
      this.modalPosition = { top: 50, left: 50, position: 'bottom' };
      return;
    }

    const targetElement = this.getTargetElement();
    if (!targetElement) return;

    this.highlightTarget(targetElement);
    this.scrollIntoView(targetElement);

    const rect = targetElement.getBoundingClientRect();
    const modalWidth = 300;
    const modalHeight = 200;
    const spacing = 12;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const windowCenter = windowWidth / 2;
    const targetCenterX = rect.left + (rect.width / 2);
    const targetCenterY = rect.top + (rect.height / 2);

    let position: 'top' | 'bottom' | 'left' | 'right';
    let left: number;
    let top: number;

    // If target is on the right side of the screen
    if (targetCenterX > windowCenter) {
      // Place modal on the left of the target
      position = 'right'; // Arrow points right
      left = rect.left - modalWidth - spacing;
      top = targetCenterY - (modalHeight / 2);
    } 
    // If target is on the left side of the screen
    else if (targetCenterX < windowCenter) {
      // Place modal on the right of the target
      position = 'left'; // Arrow points left
      left = rect.right + spacing;
      top = targetCenterY - (modalHeight / 2);
    } 
    // If target is in the center
    else {
      // If target is in the top half of the screen
      if (rect.top < windowHeight / 2) {
        // Place modal below the target
        position = 'top'; // Arrow points up
        top = rect.bottom + spacing;
        left = targetCenterX - (modalWidth / 2);
      } else {
        // Place modal above the target
        position = 'bottom'; // Arrow points down
        top = rect.top - modalHeight - spacing;
        left = targetCenterX - (modalWidth / 2);
      }
    }

    // Prevent modal from going off-screen
    left = Math.max(spacing, Math.min(left, windowWidth - modalWidth - spacing));
    top = Math.max(spacing, Math.min(top, windowHeight - modalHeight - spacing));

    this.modalPosition = { top, left, position };
  }

  private highlightTarget(element: HTMLElement): void {
    document.querySelectorAll('.tour-target-highlight').forEach(el => {
      el.classList.remove('tour-target-highlight', 'tour-target-pulse');
    });
    element.classList.add('tour-target-highlight', 'tour-target-pulse');
  }

  private scrollIntoView(element: HTMLElement): void {
    const rect = element.getBoundingClientRect();
    const isInViewport = (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= window.innerHeight &&
      rect.right <= window.innerWidth
    );

    if (!isInViewport) {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const targetTop = rect.top + scrollTop;
      window.scrollTo({
        top: targetTop - window.innerHeight / 2,
        behavior: 'smooth'
      });
    }
  }

  private onResize = (): void => {
    if (this.currentTour) {
      this.updateModalPosition();
    }
  };
  
  getCurrentContent(): TourContent | undefined {
    return this.tourContents[this.currentStep];
  }
  
  get isLastStep(): boolean {
    return this.currentStep === this.tourContents.length - 1;
  }
  
  next(): void {
    this.tourService.nextStep();
  }
  
  previous(): void {
    this.tourService.previousStep();
  }
  
  end(): void {
    this.tourService.endTour();
  }
  
  getArrowPosition(): string {
    if (!this.modalPosition) return 'rotate(0deg)';
    
    // The position indicates where the arrow should point
    switch (this.modalPosition.position) {
      case 'right': // Modal is on left, arrow points right
        return 'rotate(90deg)';
      case 'left':  // Modal is on right, arrow points left
        return 'rotate(-90deg)';
      case 'bottom': // Modal is above, arrow points down
        return 'rotate(180deg)';
      case 'top':    // Modal is below, arrow points up
        return 'rotate(0deg)';
      default:
        return 'rotate(0deg)';
    }
  }
  
  ngOnDestroy(): void {
    // Remove highlight from any elements when tour ends
    document.querySelectorAll('.tour-target-highlight').forEach(el => {
      el.classList.remove('tour-target-highlight', 'tour-target-pulse');
    });
    
    this.destroy$.next();
    this.destroy$.complete();
    window.removeEventListener('resize', this.onResize);
    // Remove scroll listener if added
    window.removeEventListener('scroll', () => {});
  }

  // Optional: Update position on window scroll
  private setupScrollListener(): void {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (this.currentTour) {
            this.updateModalPosition();
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }
}