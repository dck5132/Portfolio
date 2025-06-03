import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';

// Components
import { SkillsComponent } from './skills.component';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { SkillComponent } from './skill/skill.component';

// Services
import { DeviceDetectorService } from '../../services/device-detector.service';

// Constants and Enums
import { CurrentSkills } from './constants/skills.constants';

describe('SkillsComponent', () => {
  let component: SkillsComponent;
  let fixture: ComponentFixture<SkillsComponent>;
  let deviceDetectorService: jasmine.SpyObj<DeviceDetectorService>;

  beforeEach(async () => {
    deviceDetectorService = jasmine.createSpyObj('DeviceDetectorService', [], {
      isMobileOrTablet: signal(false)
    });

    await TestBed.configureTestingModule({
      imports: [
        SkillsComponent,
        SectionTitleComponent,
        SkillComponent
      ],
      providers: [
        { provide: DeviceDetectorService, useValue: deviceDetectorService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct title configuration', () => {
    expect(component['SKILL_TITLE_CONFIG'].title).toBe('Skills');
    expect(component['SKILL_TITLE_CONFIG'].subtitle).toBeTruthy();
  });

  describe('Desktop View', () => {
    beforeEach(() => {
      deviceDetectorService.isMobileOrTablet.set(false);
      fixture.detectChanges();
    });

    it('should split skills into two columns', () => {
      const columns = fixture.debugElement.queryAll(By.css('.col-lg-6'));
      expect(columns.length).toBe(2);
    });

    it('should maintain order of skills across columns', () => {
      const orderedSkills = component['orderedSkills']();
      const columns = fixture.debugElement.queryAll(By.css('.col-lg-6'));
      
      const firstColumnSkills = columns[0].queryAll(By.directive(SkillComponent));
      const secondColumnSkills = columns[1].queryAll(By.directive(SkillComponent));

      expect(firstColumnSkills.length + secondColumnSkills.length)
        .toBe(CurrentSkills.length);

      // Check alternating distribution
      firstColumnSkills.forEach((skill, index) => {
        const skillComponent = skill.componentInstance as SkillComponent;
        expect(skillComponent.config()).toEqual(orderedSkills[index * 2]);
      });

      secondColumnSkills.forEach((skill, index) => {
        const skillComponent = skill.componentInstance as SkillComponent;
        expect(skillComponent.config()).toEqual(orderedSkills[index * 2 + 1]);
      });
    });
  });

  describe('Mobile View', () => {
    beforeEach(() => {
      deviceDetectorService.isMobileOrTablet.set(true);
      fixture.detectChanges();
    });

    it('should display skills in a single column', () => {
      const skills = fixture.debugElement.queryAll(By.directive(SkillComponent));
      expect(skills.length).toBe(CurrentSkills.length);
    });

    it('should maintain ordered skills', () => {
      const orderedSkills = component['orderedSkills']();
      const skills = fixture.debugElement.queryAll(By.directive(SkillComponent));

      skills.forEach((skill, index) => {
        const skillComponent = skill.componentInstance as SkillComponent;
        expect(skillComponent.config()).toEqual(orderedSkills[index]);
      });
    });
  });

  describe('Skills Ordering', () => {
    it('should order skills by proficiency', () => {
      const orderedSkills = component['orderedSkills']();
      
      expect(orderedSkills.every((skill, index) => 
        index === 0 || skill.proficiency <= orderedSkills[index - 1].proficiency
      )).toBeTrue();
    });

    it('should calculate correct progress values', () => {
      const orderedSkills = component['orderedSkills']();
      
      orderedSkills.forEach(skill => {
        expect(skill.ariaValue).toBe(skill.proficiency * 10);
        expect(skill.percent).toBe(`width: ${skill.proficiency * 10}%`);
      });
    });
  });
});