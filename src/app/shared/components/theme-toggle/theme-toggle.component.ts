import { ChangeDetectionStrategy, Component, computed, DOCUMENT, inject, OnInit, Renderer2, signal } from '@angular/core';

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
export class ThemeToggleComponent implements OnInit {
  private renderer = inject(Renderer2);
  private document = inject(DOCUMENT);
  private deviceDetectorService = inject(DeviceDetectorService);

  // Display Constants
  readonly DARK_MODE_CLASS = 'dark-mode';
  protected readonly TOOLTIP_TEXT = {
    dark: 'Switch to light mode',
    light: 'Switch to dark mode'
  };

  protected readonly ARIA_LABEL = {
    dark: 'Toggle light mode on' ,
    light: 'Toggle dark mode on'
  };

  readonly isDarkMode = signal(false);
  protected readonly themeToggleTooltip = computed(() => this.isDarkMode() ? this.TOOLTIP_TEXT.dark : this.TOOLTIP_TEXT.light);
  readonly themeToggleAriaLabel = computed(() => this.isDarkMode() ? this.ARIA_LABEL.dark : this.ARIA_LABEL.light);
  protected readonly themeToggleIcon = computed(() => this.isDarkMode() ? faSun: faMoon );
  protected readonly isMobile = computed(() => this.deviceDetectorService.isMobileOrTablet());

  // Check the window media query to see if the user prefers dark mode and update the website styling to match
  ngOnInit(): void {
    this.setInitialTheme();
  }

  setInitialTheme(): void {
    this.isDarkMode.set(window.matchMedia('(prefers-color-scheme: dark)').matches);
    this.applyTheme();
  }

  toggleTheme(): void {
    this.isDarkMode.update(() => !this.isDarkMode());
    this.applyTheme();
  }

  applyTheme(): void {
    if (this.isDarkMode()) {
      this.renderer.addClass(this.document.body, this.DARK_MODE_CLASS);
    } else {
      this.renderer.removeClass(this.document.body, this.DARK_MODE_CLASS);
    }
  }
}
