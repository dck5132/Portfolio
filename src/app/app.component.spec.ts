import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

// Services
import { DeviceDetectorService } from './services/device-detector.service';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let deviceDetectorService: jasmine.SpyObj<DeviceDetectorService>;

  beforeEach(async () => {

    deviceDetectorService = jasmine.createSpyObj('DeviceDetectorService', [], {
      isMobileOrTablet: signal(false)
    });

    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        HeaderComponent,
        FooterComponent
      ],
      providers: [
        provideRouter([]),
        { provide: DeviceDetectorService, useValue: deviceDetectorService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('Page Top Section', () => {
    it('should not exist in desktop mode', () => {
      const PageTopSectionElement = fixture.debugElement.query(By.css(`#${component.PAGE_TOP_ID}`));
      expect(PageTopSectionElement).toBeNull();
    });
    it('should exist in mobile or tablet mode', () => {
      deviceDetectorService.isMobileOrTablet.set(true);
      fixture.detectChanges();
      const PageTopSectionElement = fixture.debugElement.query(By.css(`#${component.PAGE_TOP_ID}`));
      expect(PageTopSectionElement).toBeTruthy();
    });
  });
});