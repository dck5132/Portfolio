import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TitleCasePipe } from '@angular/common';

// Components
import { ResumeComponent } from './resume.component';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';

// Constants and Enums
import {
  ResumeContent,
  ResumeLeftSideTitles,
  ResumeRightSideLocations
} from './constants/resume.constants';
import { ResumeTitle } from './constants/resume.enums';
import { Project } from '../../shared/constants/information.enums';

describe('ResumeComponent', () => {
  let component: ResumeComponent;
  let fixture: ComponentFixture<ResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ResumeComponent,
        SectionTitleComponent,
        TitleCasePipe
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Title Configuration', () => {
    it('should have correct title config', () => {
      expect(component.RESUME_TITLE_CONFIG.title).toBe('resume');
      expect(component.RESUME_TITLE_CONFIG.subtitle).toBeTruthy();
    });

    it('should render section title component', () => {
      const titleComponent = fixture.debugElement.query(
        By.directive(SectionTitleComponent)
      );
      expect(titleComponent).toBeTruthy();
      
      const titleInstance = titleComponent.componentInstance as SectionTitleComponent;
      expect(titleInstance.config()).toEqual(component.RESUME_TITLE_CONFIG);
    });
  });

  describe('Resume Content Display', () => {
    it('should split content into two columns', () => {
      const columns = fixture.debugElement.queryAll(By.css('.col-lg-6'));
      expect(columns.length).toBe(2);
    });

    it('should display resume items correctly', () => {
      const items = fixture.debugElement.queryAll(By.css('.resume-item'));
      expect(items.length).toBeGreaterThan(0);
      expect(items.length).toBe(ResumeContent.length);
    });

    it('should render all section titles', () => {
      const titles = fixture.debugElement.queryAll(By.css('.resume-title'));
      const expectedTitles = ResumeContent.filter(item => item.title).length;
      expect(titles.length).toBe(expectedTitles);
    });
  });

  describe('Content Organization', () => {
    it('should organize first half correctly', () => {
      const content = component.displayedResumeContent();
      const firstHalf = content[0];

      firstHalf.forEach(section => {
        const hasValidTitle = section.title ? 
          ResumeLeftSideTitles.includes(section.title as ResumeTitle) : 
          false;
        const isAmstedDigital = section.location === Project.AMSTED_DIGITAL;
        
        expect(hasValidTitle || isAmstedDigital).toBeTrue();
      });
    });

    it('should organize second half correctly', () => {
      const content = component.displayedResumeContent();
      const secondHalf = content[1];

      secondHalf.forEach(section => {
        const isEducation = section.title === ResumeTitle.EDUCATION;
        const hasValidLocation = section.location ? 
          ResumeRightSideLocations.includes(section.location as Project) : 
          false;
        
        expect(isEducation || hasValidLocation).toBeTrue();
      });
    });
  });

  describe('Resume Items Display', () => {
    it('should display item details when available', () => {
      const itemWithDetails = ResumeContent.find(item => item.details?.length);
      if (!itemWithDetails) fail('No item with details found');

      const detailsList = fixture.debugElement.queryAll(By.css('[data-testid^="resume-detail"]'));
      expect(detailsList.length).toBeGreaterThan(0);
    });

    it('should format locations with titlecase', () => {
      const locations = fixture.debugElement.queryAll(By.css('[data-testid="resume-location"]'));
      locations.forEach((location) => {
        const text: string = location.nativeElement.textContent;
        expect(text).toBe(text.replace(/\w\S*/g, 
          text => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
        ));
      });
    });

    it('should display description exactly as provided in constants', () => {
      const itemsWithDescriptions = ResumeContent.filter(item => item.description);
      
      if (!itemsWithDescriptions.length) {
        fail('No items with descriptions found in ResumeContent');
      }

      const descriptionElements = fixture.debugElement.queryAll(By.css('[data-testid="resume-description"]'));

      expect(descriptionElements.length).toBe(itemsWithDescriptions.length);

      descriptionElements.forEach((element, index) => {
        const actualText = element.nativeElement.textContent.trim();
        const expectedText = itemsWithDescriptions[index].description;
        
        expect(actualText).toBe(expectedText);
      });
    });
  });
});