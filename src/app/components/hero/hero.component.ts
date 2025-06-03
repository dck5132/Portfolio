import { ChangeDetectionStrategy, Component } from '@angular/core';
// External Libraries
import { NgxTypewriterComponent } from '@omnedia/ngx-typewriter';
// Constants and Enums
import { Name } from '../../shared/constants/information.constants';
import { ImagePathAndAltTextToImageConfig } from '../../shared/constants/image.constants';
import { Roles } from '../../shared/constants/information.constants';

@Component({
  selector: 'portfolio-hero',
  imports: [
    NgxTypewriterComponent,
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  // Display Constants
  readonly NAME = Name;
  readonly ROLE_PREFIX = `I'm a`;
  readonly ROLES = Roles;
  readonly BACKGROUND_IMAGE = ImagePathAndAltTextToImageConfig.HeroBackground;
}
