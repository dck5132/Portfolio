import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// Components
import { AboutComponent } from './about.component';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';

// Constants and Enums
import { AboutDetails } from './constants/about.constants';
import { InformationType } from '../../shared/constants/information.enums';
import { Roles } from '../../shared/constants/information.constants';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AboutComponent,
        SectionTitleComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Title Configuration', () => {
    it('should have correct title config', () => {
      expect(component.ABOUT_TITLE_CONFIG.title).toBe('About');
      expect(component.ABOUT_TITLE_CONFIG.subtitle).toBeTruthy();
    });

    it('should render section title component', () => {
      const titleComponent = fixture.debugElement.query(
        By.directive(SectionTitleComponent)
      );
      expect(titleComponent).toBeTruthy();
      
      const titleInstance = titleComponent.componentInstance as SectionTitleComponent;
      expect(titleInstance.config()).toEqual(component.ABOUT_TITLE_CONFIG);
    });
  });

  describe('Content Display', () => {
    it('should display job titles correctly', () => {
      const titleElement = fixture.debugElement.query(By.css('[data-testid="about-job-titles"]'));
      expect(titleElement.nativeElement.textContent).toBe(Roles.join(' & '));
    });

    it('should display job summary', () => {
      const summaryElement = fixture.debugElement.query(By.css('[data-testid="about-job-summary"]'));
      expect(summaryElement.nativeElement.textContent?.trim()).toBe(component.JOB_TITLE_SUMMARY);
    });

    it('should render profile image', () => {
      const imageElement = fixture.debugElement.query(By.css('[data-testid="about-photo"]')).nativeElement;
      expect(imageElement.src).toContain(component.IMAGE.src);
      expect(imageElement.alt).toBe(component.IMAGE.alt);
    });
  });

  describe('Information Display', () => {
    it('should split information into two columns', () => {
      const columns = fixture.debugElement.queryAll(By.css('.col-lg-6'));
      expect(columns.length).toBe(2);
    });

    it('should display all information items', () => {
      const items = fixture.debugElement.queryAll(By.css('li'));
      expect(items.length).toBe(AboutDetails.length);
    });

    it('should format links correctly', () => {
      const linkItems = AboutDetails.filter(
        item => item.type === InformationType.LINK
      );
      
      const links = fixture.debugElement.queryAll(By.css('[data-testid^="about-link"]'));
      expect(links.length).toBe(linkItems.length);
      
      links.forEach(link => {
        const href = link.nativeElement.getAttribute('href');
        expect(linkItems.some(item => item.detail === href)).toBeTrue();
      });
    });

    it('should format email correctly', () => {
      const emailItem = AboutDetails.find(
        item => item.type === InformationType.EMAIL
      );
      
      if (!emailItem) {
        fail('No email item found');
      }

      const emailLink = fixture.debugElement.query(
        By.css(`a[href^="mailto:"]`)
      );
      expect(emailLink).toBeTruthy();
      expect(emailLink.nativeElement.href).toContain(`mailto:${emailItem!.detail}`);
    });
  });
});