import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

// External Libraries
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { MatButtonModule } from '@angular/material/button';

// Constants and Enums and Enums
import { InternalPaths } from '../../shared/constants/routing.enums';

// Services
import { DeviceDetectorService } from '../../services/device-detector.service';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'portfolio-footer',
  imports: [
    FaIconComponent,
    MatButtonModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit {
  // Dependencies
  private deviceDetectorService = inject(DeviceDetectorService);
  private scrollService = inject(ScrollService);
  private destroyRef = inject(DestroyRef);
  // Display Constants
  protected readonly SCROLL_TOP_ICON = faArrowUp;
  // State
  protected isAtTop = signal(false);
  protected isScrollUpArrowDisplayed = computed(() => this.deviceDetectorService.isMobileOrTablet() && !this.isAtTop());
  protected isScrollUpArrowDisabled = signal(false);

  ngOnInit(): void {
    this.initializeScrollDetection();
  }

  protected scrollToTop(): void {
    this.scrollService.scrollToSection(InternalPaths.HERO);
    this.isScrollUpArrowDisabled.set(true);
  }

  protected initializeScrollDetection(): void {
    this.scrollService.isAtTop$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isScrolledToTop) => {
        if(!isScrolledToTop && this.isScrollUpArrowDisabled()) {
          this.isScrollUpArrowDisabled.set(false);
        }
        this.isAtTop.set(isScrolledToTop);
      });
  }

}
