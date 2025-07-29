
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

// External Libraries
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';
import { MatButtonModule } from '@angular/material/button';

// Constants and Enums
import { ExternalRoutes, InternalRoutes } from '../../shared/constants/routing.constants';
import { Name } from '../../shared/constants/information.constants';
import { ImagePathAndAltTextToImageConfig } from '../../shared/constants/image.constants';
import { InternalPaths } from '../../shared/constants/routing.enums';

// Services
import { DeviceDetectorService } from '../../services/device-detector.service';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'portfolio-header',
  imports: [
    NgOptimizedImage,
    RouterLink,
    TitleCasePipe,
    FaIconComponent,
    MatButtonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  // Dependencies 
  private deviceDetectorService = inject(DeviceDetectorService);
  private scrollService = inject(ScrollService);
  // Display Constants
  protected readonly EXTERNAL_ROUTES = ExternalRoutes;
  protected readonly INTERNAL_ROUTES = InternalRoutes;
  protected readonly INTERNAL_PATH = InternalPaths;
  protected readonly MENU_ICONS = {
    SHOW: faBars,
    CLOSE: faClose
  };
  protected readonly NAME = Name;
  protected readonly AVATAR_IMAGE = ImagePathAndAltTextToImageConfig.Profile;
  
  // Menu State
  protected readonly isMenuToggleDisabled = signal(false);
  protected readonly isMenuToggledOpen = signal(false);
  protected readonly isMenuDisplayed = computed(() => this.isMenuToggledOpen() || !this.deviceDetectorService.isMobileOrTablet());
  // Mobile Specific Display/Icon
  protected readonly showMobileMenuToggle = computed(() => this.deviceDetectorService.isMobileOrTablet());
  protected readonly mobileMenuToggleIcon = computed(() => this.isMenuToggledOpen() ? this.MENU_ICONS.CLOSE : this.MENU_ICONS.SHOW);

  protected triggerScroll(sectionId: InternalPaths): void {
    this.scrollService.scrollToSection(sectionId);
    this.closeMobileMenuAfterNavigation();
  }

  protected closeMobileMenuAfterNavigation(): void {
    if (this.deviceDetectorService.isMobileOrTablet()) {
      this.isMenuToggledOpen.set(false);
    }
  }

  protected checkIfSectionIsActive(sectionId: string): boolean {
    return this.scrollService.activeSection() === sectionId;
  }

  protected toggleMobileMenu(): void {
    this.isMenuToggleDisabled.set(true);
    this.isMenuToggledOpen.update((isMenuOpen) => !isMenuOpen);
    // Re-enable after animation completes
    setTimeout(() => {
      this.isMenuToggleDisabled.set(false);
    }, 300); // Matches transition duration in CSS
  }
}
