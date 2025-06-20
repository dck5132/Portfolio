import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';

// External Libraries
import { BehaviorSubject } from 'rxjs';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';

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
  let loader: HarnessLoader;
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

  describe('Scroll Up Arrow Button Display', () => {
    it('should hide arrow button on desktop', async () => {
      loader = TestbedHarnessEnvironment.loader(fixture);
      deviceDetectorService.isMobileOrTablet.set(false);

      const scrollUpButton = await loader.getHarnessOrNull(MatButtonHarness.with({ selector: '#scroll-top' }));
      expect(scrollUpButton).toBeNull();
    });

    it('should show arrow button on mobile when not at top', async () => {
      loader = TestbedHarnessEnvironment.loader(fixture);
      deviceDetectorService.isMobileOrTablet.set(true);
      isAtTop$.next(false);

      const scrollUpButton = await loader.getHarness(MatButtonHarness.with({ selector: '#scroll-top' }));
      expect(scrollUpButton).toBeTruthy();
    });

    it('should hide arrow button on mobile when at top', async () => {
      loader = TestbedHarnessEnvironment.loader(fixture);
      deviceDetectorService.isMobileOrTablet.set(true);
      isAtTop$.next(true);

      const scrollUpButton = await loader.getHarnessOrNull(MatButtonHarness.with({ selector: '#scroll-top' }));
      expect(scrollUpButton).toBeNull();
    });
  });

  describe('Scroll Up Arrow Button Functionality', () => {
    it('should scroll to hero section when arrow button clicked', async () => {
      loader = TestbedHarnessEnvironment.loader(fixture);
      deviceDetectorService.isMobileOrTablet.set(true);
      isAtTop$.next(false);

      const scrollUpButton = await loader.getHarness(MatButtonHarness.with({ selector: '#scroll-top' }));
      await scrollUpButton.click();

      expect(scrollService.scrollToSection).toHaveBeenCalledWith(InternalPaths.HERO);
    });

    it('should disable arrow button interaction while scrolling', async () => {
      loader = TestbedHarnessEnvironment.loader(fixture);
      deviceDetectorService.isMobileOrTablet.set(true);
      isAtTop$.next(false);

      const scrollUpButton = await loader.getHarness(MatButtonHarness.with({ selector: '#scroll-top' }));
      await scrollUpButton.click();

      expect(await scrollUpButton.isDisabled()).toBeTrue();
    });

    it('should enable arrow button when scroll completes and the user scrolls down', async () => {
      loader = TestbedHarnessEnvironment.loader(fixture);
      deviceDetectorService.isMobileOrTablet.set(true);
      isAtTop$.next(false);

      const scrollUpButton = await loader.getHarness(MatButtonHarness.with({ selector: '#scroll-top' }));
      await scrollUpButton.click();

      isAtTop$.next(false);

      expect(await scrollUpButton.isDisabled()).toBeFalse();
    });
  });

  describe('Scroll Up Arrow Button Accessibility', () => {
    it('should have proper aria-label', async () => {
      loader = TestbedHarnessEnvironment.loader(fixture);
      deviceDetectorService.isMobileOrTablet.set(true);
      isAtTop$.next(false);

      const scrollUpButton = await loader.getHarness(MatButtonHarness.with({ selector: '#scroll-top' }));
      const scrollUpButtonHost = await scrollUpButton.host();
      const scrollUpButtonAriaLabel = await scrollUpButtonHost.getAttribute('aria-label');

      expect(scrollUpButtonAriaLabel).toBe('Scroll to top');
    });

    it('should be focusable via keyboard', async () => {
      loader = TestbedHarnessEnvironment.loader(fixture);
      deviceDetectorService.isMobileOrTablet.set(true);
      isAtTop$.next(false);

      const scrollUpButton = await loader.getHarness(MatButtonHarness.with({ selector: '#scroll-top' }));
      await scrollUpButton.focus();

      expect(await scrollUpButton.isFocused()).toBeTrue();
    });
  });
});