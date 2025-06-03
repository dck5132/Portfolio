import { ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';

// Interfaces
import { SkillsAndExperience } from './interfaces/skills.interfaces';
import { sectionTitleConfig } from '../../shared/components/section-title/interfaces/section-title.interfaces';

// Components
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { SkillComponent } from './skill/skill.component';

// Services
import { DeviceDetectorService } from '../../services/device-detector.service';

// Constants and Enums
import { CurrentSkills } from './constants/skills.constants';

@Component({
  selector: 'portfolio-skills',
  imports: [
    SectionTitleComponent,
    SkillComponent
  ],
  templateUrl: './skills.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsComponent {
  // Dependencies
  private deviceDetectorService = inject(DeviceDetectorService);
  // Display Constants
  protected readonly SKILL = 'Skills';
  protected readonly SKILL_SUMMARY = `I'm an experienced web developer and software engineer proficient in JavaScript frameworks like Angular, dedicated to building responsive, and scalable applications.`;
  protected readonly SKILL_TITLE_CONFIG: sectionTitleConfig = {
    title: this.SKILL,
    subtitle: this.SKILL_SUMMARY
  };
  // State
  protected isMobile = computed(() => this.deviceDetectorService.isMobileOrTablet());
  // Used for Mobile
  protected orderedSkills = computed(() => {
    // Adds values needed for progress bars
    return CurrentSkills.map((skill) => ({
        ...skill,
        ariaValue: skill.proficiency * 10,
        percent: `width: ${skill.proficiency * 10}%`
    }))
    .sort((first, second) => second.proficiency - first.proficiency);
  });

  // Used for Desktop (Split between 2 arrays)
  protected orderedSkillsSplit = computed(() => {
    const skillColumns: SkillsAndExperience[][] = [[], []];
    this.orderedSkills().forEach((skill, index) => {
      skillColumns[index % 2].push(skill);
    });
    return skillColumns;
  });
}
