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
  config = input.required<SkillsAndExperience>();

  label = computed(() => `${this.config().name}: ${this.config().proficiency } years`);
  ariaLabel = computed(() => `Proficiency in ${this.config().name}`);
  ariaValueNow = computed(() => this.config().proficiency * 10);

}
