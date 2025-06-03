import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

// Constants and Enums
import { ResumeContent, ResumeLeftSideTitles, ResumeRightSideLocations } from './constants/resume.constants';
import { ResumeTitle } from './constants/resume.enums';
import { Project } from '../../shared/constants/information.enums';

// Components
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';

// Interfaces
import { sectionTitleConfig } from '../../shared/components/section-title/interfaces/section-title.interfaces';

@Component({
  selector: 'portfolio-resume',
  imports: [
    TitleCasePipe,
    SectionTitleComponent
  ],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeComponent {
  // Display Constants
  readonly RESUME = 'resume';
  readonly RESUME_SUBTITLE = 'I have contributed to user facing applications at Everglades Technologies, Knowledgent, Amsted Digital, and most recently at Experian. I continue to seek more opportunities to expand my knowledge and develop responsive applications that are accessible and scalable.';
  readonly RESUME_TITLE_CONFIG: sectionTitleConfig = {
    title: this.RESUME,
    subtitle: this.RESUME_SUBTITLE
  };

  // Displayed Content
  displayedResumeContent = computed(() => {
    const ResumeFirstHalf = ResumeContent.filter((section) => {
      const title = (section.title ?? '' )as ResumeTitle;
      return ResumeLeftSideTitles.includes(title) || section.location === Project.AMSTED_DIGITAL;
    });
    const ResumeSecondHalf= ResumeContent.filter((section) => {
      const location = (section.location ?? '') as Project; 
      return section.title === ResumeTitle.EDUCATION || ResumeRightSideLocations.includes(location);
    });
    return [ResumeFirstHalf, ResumeSecondHalf];
  });
}