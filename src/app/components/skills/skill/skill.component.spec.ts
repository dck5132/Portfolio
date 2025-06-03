import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// Components
import { SkillComponent } from './skill.component';

// Interfaces
import { SkillsAndExperience } from '../interfaces/skills.interfaces';

describe('SkillComponent', () => {
  let component: SkillComponent;
  let fixture: ComponentFixture<SkillComponent>;

  const mockSkill: SkillsAndExperience = {
    name: 'Angular',
    proficiency: 5,
    ariaValue: 50,
    percent: 'width: 50%'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SkillComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should throw error when config input is not provided', () => {
    expect(() => fixture.detectChanges())
      .toThrowError(/required/i);
  });

  describe('with config provided', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('config', mockSkill);
      fixture.detectChanges();
    });

    it('should display skill name and proficiency', () => {
      const skillElement = fixture.debugElement.query(By.css('.skill')).nativeElement as HTMLElement;
      
      expect(skillElement.textContent).toContain(`${mockSkill.name}: ${mockSkill.proficiency} years`);
    });

    it('should set correct progress bar attributes', () => {
      const progressBar = fixture.debugElement.query(By.css('.progress')).nativeElement as HTMLElement;
      
      expect(progressBar.getAttribute('role')).toBe('progressbar');
      expect(progressBar.getAttribute('aria-label')).toBe(`Proficiency in ${mockSkill.name}`);
      expect(progressBar.getAttribute('aria-valuenow')).toBe(mockSkill.ariaValue!.toString());
      expect(progressBar.getAttribute('aria-valuemin')).toBe('0');
      expect(progressBar.getAttribute('aria-valuemax')).toBe('100');
    });

    it('should set correct progress bar width', () => {
      const progressBarInner = fixture.debugElement.query(
        By.css('.progress-bar')
      ).nativeElement as HTMLElement;
      
      expect(progressBarInner.style.width).toBe(`${mockSkill.ariaValue}%`);
    });

    it('should update view when config changes', () => {
      const updatedSkill: SkillsAndExperience = {
        name: 'React',
        proficiency: 3,
        ariaValue: 30,
        percent: 'width: 30%'
      };

      fixture.componentRef.setInput('config', updatedSkill);
      fixture.detectChanges();

      const skillElement = fixture.debugElement.query(
        By.css('.skill')
      ).nativeElement as HTMLElement;
      
      expect(skillElement.textContent).toContain(`${updatedSkill.name}: ${updatedSkill.proficiency} years`);
    });
  });
});