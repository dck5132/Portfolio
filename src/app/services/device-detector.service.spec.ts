import { TestBed } from '@angular/core/testing';

// External Libraries
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject } from 'rxjs';

// Services
import { DeviceDetectorService } from './device-detector.service';

describe('DeviceDetectorService', () => {
  let service: DeviceDetectorService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let breakpointObserver: jasmine.SpyObj<BreakpointObserver>;
  let breakpointState$: BehaviorSubject<{ matches: boolean; breakpoints: Record<string, boolean> }>;

  beforeEach(() => {
    breakpointState$ = new BehaviorSubject<{ matches: boolean; breakpoints: Record<string, boolean> }>({
      matches: false,
      breakpoints: {
        [Breakpoints.Handset]: false,
        [Breakpoints.Tablet]: false,
        [Breakpoints.Web]: true
      }
    });

    const breakpointSpy = jasmine.createSpyObj('BreakpointObserver', ['observe']);
    breakpointSpy.observe.and.returnValue(breakpointState$.asObservable());

    TestBed.configureTestingModule({
      providers: [
        DeviceDetectorService,
        { provide: BreakpointObserver, useValue: breakpointSpy }
      ]
    });

    service = TestBed.inject(DeviceDetectorService);
    breakpointObserver = TestBed.inject(BreakpointObserver) as jasmine.SpyObj<BreakpointObserver>;
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with desktop breakpoint', () => {
    expect(service.isMobileOrTablet()).toBeFalse();
  });

  it('should detect handset portrait breakpoint', () => {
    breakpointState$.next({
      matches: true,
      breakpoints: {
        [Breakpoints.HandsetPortrait]: true,
        [Breakpoints.Handset]: true,
        [Breakpoints.Tablet]: false,
        [Breakpoints.Web]: false
      }
    });

    expect(service.isMobileOrTablet()).toBeTrue();
  });

  it('should detect handset landscape breakpoint', () => {
    breakpointState$.next({
      matches: true,
      breakpoints: {
        [Breakpoints.HandsetLandscape]: true,
        [Breakpoints.Handset]: true,
        [Breakpoints.Tablet]: false,
        [Breakpoints.Web]: false
      }
    });

    expect(service.isMobileOrTablet()).toBeTrue();
  });

  it('should detect tablet portrait breakpoint', () => {
    breakpointState$.next({
      matches: true,
      breakpoints: {
        [Breakpoints.TabletPortrait]: true,
        [Breakpoints.Handset]: false,
        [Breakpoints.Tablet]: true,
        [Breakpoints.Web]: false
      }
    });

    expect(service.isMobileOrTablet()).toBeTrue();
  });

  it('should detect tablet landscape breakpoint', () => {
    breakpointState$.next({
      matches: true,
      breakpoints: {
        [Breakpoints.TabletLandscape]: true,
        [Breakpoints.Handset]: false,
        [Breakpoints.Tablet]: true,
        [Breakpoints.Web]: false
      }
    });

    expect(service.isMobileOrTablet()).toBeTrue();
  });

  it('should detect web breakpoint', () => {
    breakpointState$.next({
      matches: true,
      breakpoints: {
        [Breakpoints.HandsetPortrait]: false,
        [Breakpoints.HandsetLandscape]: false,
        [Breakpoints.TabletPortrait]: false,
        [Breakpoints.TabletLandscape]: false,
        [Breakpoints.Web]: true
      }
    });

    expect(service.isMobileOrTablet()).toBeFalse();
  });

  it('should handle multiple active breakpoints correctly', () => {
    breakpointState$.next({
      matches: true,
      breakpoints: {
        [Breakpoints.HandsetPortrait]: true,
        [Breakpoints.TabletPortrait]: true,
        [Breakpoints.Web]: true
      }
    });

    expect(service.isMobileOrTablet()).toBeTrue();
  });

  it('should maintain previous state when no matching breakpoints', () => {
    const initialState = service.isMobileOrTablet();

    breakpointState$.next({
      matches: false,
      breakpoints: {}
    });

    expect(service.isMobileOrTablet()).toBe(initialState);
  });
});