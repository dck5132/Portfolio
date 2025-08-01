import { ChangeDetectionStrategy, Component, computed, DOCUMENT, inject, Renderer2, signal } from '@angular/core';

// External Libraries
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

// Services
import { DeviceDetectorService } from '../../../services/device-detector.service';

@Component({
  selector: 'portfolio-theme-toggle',
  imports: [
    FaIconComponent,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeToggleComponent {
  private renderer = inject(Renderer2);
  private document = inject(DOCUMENT);
  private deviceDetectorService = inject(DeviceDetectorService);

  protected readonly isDarkMode = signal(false);
  protected readonly themeToggleTooltip = computed(() => this.isDarkMode() ? 'Switch to light mode' : 'Switch to dark mode');
  readonly themeToggleAriaLabel = computed(() => this.isDarkMode() ? 'Toggle light mode on' : 'Toggle light mode off')
  protected readonly themeToggleIcon = computed(() => this.isDarkMode() ? faSun: faMoon );
  protected readonly isMobile = computed(() => this.deviceDetectorService.isMobileOrTablet());

  toggleTheme(): void {
    this.isDarkMode.update(() => !this.isDarkMode());
    this.applyTheme();
  }

  applyTheme(): void {
    if (this.isDarkMode()) {
      this.renderer.addClass(this.document.body, 'dark-mode');
    } else {
      this.renderer.removeClass(this.document.body, 'dark-mode');
    }
  }
}
