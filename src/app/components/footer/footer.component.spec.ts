import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { signal } from '@angular/core';

// Third Party Libraries
import { BehaviorSubject } from 'rxjs';

// Components
import { FooterComponent } from './footer.component';

// Services
import { DeviceDetectorService } from '../../services/device-detector.service';
import { ScrollService } from '../../services/scroll.service';

// Constants and Enums
import { InternalPaths } from '../../shared/constants/routing.enums';


describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let deviceDetectorService: jasmine.SpyObj<DeviceDetectorService>;
  let scrollService: jasmine.SpyObj<ScrollService>;
  let isAtTop$: BehaviorSubject<boolean>;

  beforeEach(async () => {
    isAtTop$ = new BehaviorSubject<boolean>(true);

    deviceDetectorService = jasmine.createSpyObj('DeviceDetectorService', [], {
      isMobileOrTablet: signal(false)
    });

    scrollService = jasmine.createSpyObj('ScrollService', ['scrollToSection'], {
      isAtTop$: isAtTop$.asObservable()
    });

    await TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [
        { provide: DeviceDetectorService, useValue: deviceDetectorService },
        { provide: ScrollService, useValue: scrollService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Scroll Up Arrow Display', () => {
    it('should hide arrow on desktop', () => {
      deviceDetectorService.isMobileOrTablet.set(false);
      fixture.detectChanges();

      const arrow = fixture.debugElement.query(By.css('#scroll-top'));
      expect(arrow).toBeFalsy();
    });

    it('should show arrow on mobile when not at top', () => {
      deviceDetectorService.isMobileOrTablet.set(true);
      isAtTop$.next(false);
      fixture.detectChanges();

      const arrow = fixture.debugElement.query(By.css('#scroll-top'));
      expect(arrow).toBeTruthy();
    });

    it('should hide arrow on mobile when at top', () => {
      deviceDetectorService.isMobileOrTablet.set(true);
      isAtTop$.next(true);
      fixture.detectChanges();

      const arrow = fixture.debugElement.query(By.css('#scroll-top'));
      expect(arrow).toBeFalsy();
    });
  });

  describe('Scroll To Top Functionality', () => {
    it('should scroll to hero section when arrow clicked', () => {
      deviceDetectorService.isMobileOrTablet.set(true);
      isAtTop$.next(false);
      fixture.detectChanges();

      const arrow = fixture.debugElement.query(By.css('#scroll-top'));
      arrow.triggerEventHandler('click');

      expect(scrollService.scrollToSection).toHaveBeenCalledWith(InternalPaths.HERO);
    });

    it('should disable arrow immediately after click', () => {
      deviceDetectorService.isMobileOrTablet.set(true);
      isAtTop$.next(false);
      fixture.detectChanges();

      const arrow = fixture.debugElement.query(By.css('#scroll-top'));
      arrow.triggerEventHandler('click');
      fixture.detectChanges();

      expect(component['isScrollUpArrowDisabled']()).toBeTrue();
    });

    it('should enable arrow when scroll completes', () => {
      deviceDetectorService.isMobileOrTablet.set(true);
      isAtTop$.next(false);
      fixture.detectChanges();

      const arrow = fixture.debugElement.query(By.css('#scroll-top'));
      arrow.triggerEventHandler('click');
      fixture.detectChanges();

      isAtTop$.next(false);
      fixture.detectChanges();

      expect(component['isScrollUpArrowDisabled']()).toBeFalse();
    });
  });

  describe('Accessibility', () => {
    it('should have proper aria-label on scroll button', () => {
      deviceDetectorService.isMobileOrTablet.set(true);
      isAtTop$.next(false);
      fixture.detectChanges();

      const arrow = fixture.debugElement.query(By.css('#scroll-top'));
      expect(arrow.attributes['aria-label']).toBe('Scroll to top');
    });

    it('should disable button interaction while scrolling', () => {
      deviceDetectorService.isMobileOrTablet.set(true);
      isAtTop$.next(false);
      fixture.detectChanges();

      const arrow = fixture.debugElement.query(By.css('#scroll-top'));
      arrow.triggerEventHandler('click');
      fixture.detectChanges();

      expect(arrow.attributes['disabled']).toBe('true');
    });
  });
});