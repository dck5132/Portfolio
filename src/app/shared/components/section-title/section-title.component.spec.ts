import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TitleCasePipe } from '@angular/common';
import { SectionTitleComponent } from './section-title.component';
import { sectionTitleConfig } from './interfaces/section-title.interfaces';

describe('SectionTitleComponent', () => {
  let component: SectionTitleComponent;
  let fixture: ComponentFixture<SectionTitleComponent>;

  const mockConfig: sectionTitleConfig = {
    title: 'test title',
    subtitle: 'test subtitle'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SectionTitleComponent,
        TitleCasePipe
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SectionTitleComponent);
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
      fixture.componentRef.setInput('config', mockConfig);
      fixture.detectChanges();
    });

    it('should display title in titlecase', () => {
      const titleElement = fixture.debugElement.query(
        By.css('h2')
      ).nativeElement as HTMLHeadingElement;
      
      expect(titleElement.textContent?.trim())
        .toBe('Test Title');
    });

    it('should display subtitle', () => {
      const subtitleElement = fixture.debugElement.query(
        By.css('p')
      ).nativeElement as HTMLParagraphElement;
      
      expect(subtitleElement.textContent?.trim())
        .toBe(mockConfig.subtitle);
    });

    it('should render with correct container class', () => {
      const container = fixture.debugElement.query(
        By.css('.section-title')
      ).nativeElement as HTMLDivElement;
      
      expect(container).toBeTruthy();
      expect(container.classList.contains('container')).toBeTrue();
    });

    it('should update view when config changes', () => {
      const newConfig: sectionTitleConfig = {
        title: 'new title',
        subtitle: 'new subtitle'
      };

      fixture.componentRef.setInput('config', newConfig);
      fixture.detectChanges();

      const titleElement = fixture.debugElement.query(
        By.css('h2')
      ).nativeElement as HTMLHeadingElement;
      const subtitleElement = fixture.debugElement.query(
        By.css('p')
      ).nativeElement as HTMLParagraphElement;

      expect(titleElement.textContent?.trim()).toBe('New Title');
      expect(subtitleElement.textContent?.trim()).toBe(newConfig.subtitle);
    });
  });
});