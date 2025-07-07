import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { SkillsAndExperience } from '../interfaces/skills.interfaces';

@Component({
  selector: 'portfolio-skill',
  imports: [],
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillComponent {
  readonly config = input.required<SkillsAndExperience>();

  // State
  readonly label = computed(() => `${this.config().name}: ${this.config().proficiency } years`);
  readonly ariaLabel = computed(() => `Proficiency in ${this.config().name}`);
  readonly ariaValueNow = computed(() => this.config().proficiency * 10);
}
