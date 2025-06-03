import { TestBed } from '@angular/core/testing';
import { ViewportScroller } from '@angular/common';

// Services
import { ScrollService } from './scroll.service';

// Constants and Enums
import { InternalPaths } from '../shared/constants/routing.enums';

describe('ScrollService', () => {
  let service: ScrollService;
  let viewportScroller: jasmine.SpyObj<ViewportScroller>;

  beforeEach(() => {
    const viewPortSpy = jasmine.createSpyObj('ViewportScroller', ['scrollToAnchor']);
    TestBed.configureTestingModule({
      providers: [
        ScrollService,
        { provide: ViewportScroller, useValue: viewPortSpy }
      ]
    });
    service = TestBed.inject(ScrollService);
    viewportScroller = TestBed.inject(ViewportScroller) as jasmine.SpyObj<ViewportScroller>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with HERO as active section', () => {
    expect(service.activeSection()).toBe(InternalPaths.HERO);
  });

  it('should call scrollToAnchor when scrollToSection is called', () => {
    const sectionId = InternalPaths.HERO;
    service.scrollToSection(sectionId);
    expect(viewportScroller.scrollToAnchor).toHaveBeenCalledWith(sectionId);
  });
});