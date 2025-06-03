import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
// External Libraries
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
// Components
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
// Interfaces
import { sectionTitleConfig } from '../../shared/components/section-title/interfaces/section-title.interfaces';
// Constants and Enums
import { AboutDetails } from './constants/about.constants';
import { ImagePathAndAltTextToImageConfig } from '../../shared/constants/image.constants';
import { Roles } from '../../shared/constants/information.constants';
import { InformationType } from '../../shared/constants/information.enums';

@Component({
  selector: 'portfolio-about',
  imports: [
    SectionTitleComponent,
    NgOptimizedImage,
    FaIconComponent,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  // Display Constants
  readonly ABOUT = 'About';
  readonly ABOUT_SUMMARY = `I'm a detail-oriented web developer and software engineer with 9 years of experience building responsive, user-friendly single-page applications. My journey began at Penn State University, where I developed a strong foundation in core programming principles. Since then, I've specialized in front-end development and remain committed to continuous learning and exploring new technologies to improve as a developer and engineer.`;
  readonly ABOUT_TITLE_CONFIG: sectionTitleConfig = {
    title: this.ABOUT,
    subtitle: this.ABOUT_SUMMARY
  };
  readonly JOB_TITLES = Roles.join(' & ');
  readonly JOB_TITLE_SUMMARY = `Front-End Web Developer with experience developing, deploying, and maintaining enterprise-grade user-facing applications. Passionate about building responsive, accessible, and scalable web experiences, with a continuous drive to deepen technical expertise and deliver impactful user-centric solutions.`;
  readonly IMAGE = ImagePathAndAltTextToImageConfig.Avatar;
  readonly DETAIL_ICON = faChevronRight;
  readonly ABOUT_INFORMATION_TYPE = InformationType;
  // State
  displayedInformation = computed(() => {
    const initialInformation = AboutDetails;
    const halfLength = Math.ceil(initialInformation.length / 2);
    const firstHalfOfInformation = initialInformation.slice(0, halfLength);
    const secondHalfOfInformation = initialInformation.slice(halfLength);
    return [
      [...firstHalfOfInformation],
      [...secondHalfOfInformation]
    ]
  });
}
