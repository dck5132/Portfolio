import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// External Libraries
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';

// Components
import { HeaderComponent } from './header.component';

// Services
import { DeviceDetectorService } from '../../services/device-detector.service';
import { ScrollService } from '../../services/scroll.service';

// Constants and Enums
import { InternalPaths } from '../../shared/constants/routing.enums';
import { Name } from '../../shared/constants/information.constants';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let deviceDetectorService: jasmine.SpyObj<DeviceDetectorService>;
  let scrollService: jasmine.SpyObj<ScrollService>;

  beforeEach(async () => {
    deviceDetectorService = jasmine.createSpyObj('DeviceDetectorService', [], {
      isMobileOrTablet: signal(false)
    });

    scrollService = jasmine.createSpyObj('ScrollService', ['scrollToSection'], {
      activeSection: signal(InternalPaths.HERO)
    });

    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        { provide: DeviceDetectorService, useValue: deviceDetectorService },
        { provide: ScrollService, useValue: scrollService },
        { provide: ActivatedRoute, useValue: ActivatedRoute}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Mobile Menu Toggle', () => {
    beforeEach(() => {
      deviceDetectorService.isMobileOrTablet.set(true);
      fixture.detectChanges();
    });

    it('should show menu toggle button on mobile', () => {
      const toggleButton = fixture.debugElement.query(By.css('[data-testid="menu-toggle"]'));
      expect(toggleButton).toBeTruthy();
    });

    it('should toggle menu state when button clicked', () => {
      const toggleButton = fixture.debugElement.query(By.css('[data-testid="menu-toggle"]'));
      toggleButton.triggerEventHandler('click');
      fixture.detectChanges();

      expect(component['isMenuToggledOpen']()).toBeTrue();
    });

    it('should disable button during toggle transition', () => {
      const toggleButton = fixture.debugElement.query(By.css('[data-testid="menu-toggle"]'));
      toggleButton.triggerEventHandler('click');
      fixture.detectChanges();

      expect(component['isMenuToggleDisabled']()).toBeTrue();
    });

    it('should show correct icon based on menu state', () => {
      expect(component['mobileMenuToggleIcon']()).toBe(faBars);
      
      component['isMenuToggledOpen'].set(true);
      fixture.detectChanges();
      
      expect(component['mobileMenuToggleIcon']()).toBe(faClose);
    });
  });

  describe('Menu Display', () => {
    it('should always show menu on desktop', () => {
      deviceDetectorService.isMobileOrTablet.set(false);
      fixture.detectChanges();

      expect(component['isMenuDisplayed']()).toBeTrue();
    });

    it('should only show menu on mobile when toggled', () => {
      deviceDetectorService.isMobileOrTablet.set(true);
      fixture.detectChanges();

      expect(component['isMenuDisplayed']()).toBeFalse();
      
      component['isMenuToggledOpen'].set(true);
      fixture.detectChanges();
      
      expect(component['isMenuDisplayed']()).toBeTrue();
    });
  });

  describe('Navigation', () => {
    it('should scroll to section when link clicked', () => {
      const targetSection = InternalPaths.ABOUT;
      component['triggerScroll'](targetSection);

      expect(scrollService.scrollToSection).toHaveBeenCalledWith(targetSection);
    });

    it('should close menu on mobile after navigation', () => {
      deviceDetectorService.isMobileOrTablet.set(true);
      component['isMenuToggledOpen'].set(true);
      fixture.detectChanges();

      component['triggerScroll'](InternalPaths.ABOUT);
      fixture.detectChanges();

      const navigationMenu = fixture.debugElement.query(By.css('#header'));

      expect(component['isMenuToggledOpen']()).toBeFalse();
      expect(navigationMenu).toBeNull();
    });

    it('should highlight the active section only', () => {
      const activeSection = InternalPaths.ABOUT;
      scrollService.activeSection.set(activeSection);
      fixture.detectChanges();

      expect(component['checkIfSectionIsActive'](activeSection)).toBeTrue();
      expect(component['checkIfSectionIsActive'](InternalPaths.HERO)).toBeFalse();
    });
  });

  describe('Header Content', () => {
    it('should display profile name', () => {
      const nameElement = fixture.debugElement.query(
        By.css('[data-testid="header-name-link"]')
      );
      expect(nameElement.nativeElement.textContent).toContain(Name);
    });

    it('should display profile image with correct attributes', () => {
      const imgElement = fixture.debugElement.query(By.css('[data-testid="header-photo"]')).nativeElement as HTMLImageElement;

      expect(imgElement.alt).toBe(component['AVATAR_IMAGE'].alt);
      expect(imgElement.src).toContain(component['AVATAR_IMAGE'].src);
    });
  });
});