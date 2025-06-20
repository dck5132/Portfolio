import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// External Libraries
import { NgxTypewriterComponent } from '@omnedia/ngx-typewriter';

// Components
import { HeroComponent } from './hero.component';

// Constants and Enums
import { Name, Roles } from '../../shared/constants/information.constants';
import { ImagePathAndAltTextToImageConfig } from '../../shared/constants/image.constants';

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeroComponent,
        NgxTypewriterComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Content Display', () => {
    it('should display name correctly', () => {
      const nameElement = fixture.debugElement.query(By.css('[data-testid="hero-name"]')).nativeElement as HTMLHeadingElement;
      
      expect(nameElement.textContent?.trim()).toBe(Name);
    });

    it('should display role prefix', () => {
      const rolePrefix = fixture.debugElement.query(By.css('[data-testid="hero-role-prefix"]')).nativeElement as HTMLSpanElement;
      
      expect(rolePrefix.textContent?.trim()).toBe(component.ROLE_PREFIX);
    });

    it('should pass roles to typewriter component', () => {
      const typewriter = fixture.debugElement.query(By.directive(NgxTypewriterComponent)).componentInstance as NgxTypewriterComponent;
      
      expect(typewriter.words).toEqual(Roles);
    });
  });

  describe('Background Image', () => {
    it('should set correct background image', () => {
      const backgroundImage = fixture.debugElement.query(By.css('[data-testid="hero-background-photo"]')).nativeElement as HTMLImageElement;
      
      expect(backgroundImage.src).toContain(ImagePathAndAltTextToImageConfig.HeroBackground.src);
    });
    it('should set correct background image alt', () => {
      const backgroundImage = fixture.debugElement.query(By.css('[data-testid="hero-background-photo"]')).nativeElement as HTMLImageElement;
      
      expect(backgroundImage.alt).toContain(ImagePathAndAltTextToImageConfig.HeroBackground.alt);
    });
  });

  describe('Component Constants', () => {
    it('should have correct constant values', () => {
      expect(component.NAME).toBe(Name);
      expect(component.ROLE_PREFIX).toBe(`I'm a`);
      expect(component.ROLES).toEqual(Roles);
      expect(component.BACKGROUND_IMAGE)
        .toEqual(ImagePathAndAltTextToImageConfig.HeroBackground);
    });
  });
});