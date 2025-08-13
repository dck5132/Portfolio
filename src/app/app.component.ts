import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

// Components
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";

// Services
import { DeviceDetectorService } from './services/device-detector.service';

// Constants and Enums
import { InternalPaths } from './shared/constants/routing.enums';

@Component({
  selector: 'portfolio-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private deviceDetectorService = inject(DeviceDetectorService);
  private routerService = inject(Router);

  readonly PAGE_TOP_ID = InternalPaths.PAGE_TOP;

  protected readonly isMobile = computed(() => this.deviceDetectorService.isMobileOrTablet());
}
