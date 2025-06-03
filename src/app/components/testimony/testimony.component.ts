import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

// Third Party Libraries
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';

// Components
import { SectionTitleComponent } from "../../shared/components/section-title/section-title.component";

// Interfaces
import { sectionTitleConfig } from '../../shared/components/section-title/interfaces/section-title.interfaces';

// Constants and Enums
import { Recommendations } from './constants/testimony.constants';

@Component({
  selector: 'portfolio-testimony',
  imports: [
    SectionTitleComponent,
    FaIconComponent,
    TitleCasePipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './testimony.component.html',
  styleUrl: './testimony.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestimonyComponent {
  // Display Constants
  readonly TESTIMONY = 'testimonials';
  readonly SUBTITLE = 'Recognized for delivering high-quality, scalable web applications using Angular and modern front-end technologies. I bring a strong engineering mindset, attention to detail, and a collaborative approach to building performant, user-focused software solutions.';
  readonly TESTIMONY_TITLE_CONFIG: sectionTitleConfig = {
    title: this.TESTIMONY,
    subtitle: this.SUBTITLE
  };
  readonly RECOMMENDATIONS = Recommendations;
  protected readonly leftQuote = faQuoteLeft;
  protected readonly rightQuote = faQuoteRight;

  hasListItems(testimony: string): boolean {
    return testimony.startsWith('-');
  }

  formatListItem(text: string): string {
    return text.substring(2).trim();
  }
}
