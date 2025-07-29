import { ChangeDetectionStrategy, Component, computed, signal, ViewEncapsulation } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

// External Libraries
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';

// Interfaces
import { sectionTitleConfig } from '../../shared/components/section-title/interfaces/section-title.interfaces';

// Constants and Enums
import { ProjectFilters } from './constants/projects.constants';
import { ProjectOverviews } from './constants/overview.constants';
import { ProjectTypes } from './constants/projects.enums';

// Components
import { OverviewComponent } from "./overview/overview.component";
import { SectionTitleComponent } from "../../shared/components/section-title/section-title.component";

@Component({
  selector: 'portfolio-projects',
  imports: [
    TitleCasePipe,
    MatTabsModule,
    OverviewComponent,
    SectionTitleComponent
],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  // Display Constants
  readonly PROJECTS = 'projects';
  readonly PROJECTS_SUMMARY = `From enterprise systems to personal innovation, I've designed, developed, and optimized scalable front-end solutions across diverse industries:`;
  readonly PROJECTS_TITLE_CONFIG: sectionTitleConfig = {
    title: this.PROJECTS,
    subtitle: this.PROJECTS_SUMMARY
  };
  readonly PROJECT_FILTERS = ProjectFilters;
  readonly PROJECT_OVERVIEWS = ProjectOverviews;

  // State
  readonly currentFilter = signal(ProjectTypes.ALL);
  readonly filteredOverviewList = computed(() => this.currentFilter() === ProjectTypes.ALL
    ? this.PROJECT_OVERVIEWS
    : this.PROJECT_OVERVIEWS.filter((project) => project.type === this.currentFilter())
  );

  changeTab(event: MatTabChangeEvent): void {
    const currentFilterType = event.tab.textLabel.toLowerCase() as ProjectTypes;
    this.currentFilter.set(currentFilterType);
  }
}
