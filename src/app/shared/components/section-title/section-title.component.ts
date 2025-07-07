import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

// Interfaces
import { sectionTitleConfig } from './interfaces/section-title.interfaces';

@Component({
  selector: 'portfolio-section-title',
  imports: [TitleCasePipe],
  templateUrl: './section-title.component.html',
  styleUrl: './section-title.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionTitleComponent {
  readonly config = input.required<sectionTitleConfig>();
}
