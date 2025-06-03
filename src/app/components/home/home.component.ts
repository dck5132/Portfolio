import { ChangeDetectionStrategy, Component } from '@angular/core';
// Components
import { AboutComponent } from '../about/about.component';
import { HeroComponent } from '../hero/hero.component';
import { ProjectsComponent } from '../projects/projects.component';
import { ResumeComponent } from '../resume/resume.component';
import { SkillsComponent } from "../skills/skills.component";
import { TestimonyComponent } from "../testimony/testimony.component";

@Component({
  selector: 'portfolio-home',
  imports: [
    AboutComponent,
    HeroComponent,
    ProjectsComponent,
    ResumeComponent,
    SkillsComponent,
    TestimonyComponent
],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
 
}
