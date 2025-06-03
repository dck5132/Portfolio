import { ViewportScroller } from '@angular/common';
import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

// External Libraries
import {
  animationFrameScheduler,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  observeOn,
  pairwise,
  shareReplay,
  startWith,
  throttleTime
} from 'rxjs';

// Services
import { DeviceDetectorService } from './device-detector.service';

// Interfaces
import { ScrollSection, ScrollState } from './interfaces/scroll.interfaces';

// Constants and Enums
import { InternalPaths } from '../shared/constants/routing.enums';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  // Dependencies
  private viewportScroller = inject(ViewportScroller);
  private deviceDetectorService = inject(DeviceDetectorService);
  private destroyRef = inject(DestroyRef);

  // Configuration
  private readonly SCROLL_CONFIG = {
    THRESHOLD: 50,
    THROTTLE_MS: 16,
    OPTIONS: { passive: true },
    SHARE: { bufferSize: 1, refCount: false }
  };
  // Application State
  activeSection = signal<string>(InternalPaths.HERO);

  private readonly scrollState$ = fromEvent<Event>(window, 'scroll', this.SCROLL_CONFIG.OPTIONS).pipe(
    throttleTime(this.SCROLL_CONFIG.THROTTLE_MS, undefined, { trailing: true }),
    observeOn(animationFrameScheduler),
    map(() => this.getCurrentScrollState()),
    startWith(this.getCurrentScrollState()),
    distinctUntilChanged((prev, curr) => 
      prev.offset === curr.offset && 
      prev.windowHeight === curr.windowHeight
    ),
    shareReplay(this.SCROLL_CONFIG.SHARE)
  );

  readonly isAtTop$ = this.scrollState$.pipe(
    filter(() => this.deviceDetectorService.isMobileOrTablet()),
    map(state => state.offset <= this.SCROLL_CONFIG.THRESHOLD),
    distinctUntilChanged(),
    shareReplay(this.SCROLL_CONFIG.SHARE)
  );

  constructor() {
    this.initializeScrollSpy();
  }

  scrollToSection(sectionId: InternalPaths): void {
    this.viewportScroller.scrollToAnchor(sectionId);
  }

  private initializeScrollSpy(): void {
    this.scrollState$.pipe(
      pairwise(),
      map(([, current]) => ({
        ...current
      })),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((state) => {
      const activeSection = this.calculateActiveSection(state);
      if (activeSection) {
        this.activeSection.set(activeSection);
      }
    });
  }

  private getCurrentScrollState(): ScrollState {
    return {
      offset: Math.max(0, window.scrollY),
      windowHeight: window.innerHeight,
      sections: this.getSectionPositions()
    };
  }

  private getSectionPositions(): ScrollSection[] {
    return Array.from(document.querySelectorAll<HTMLElement>('section[id]'))
      .map(section => ({
        id: section.id,
        top: section.offsetTop,
        height: section.clientHeight
      }))
      .sort((a, b) => a.top - b.top);
  }

  private calculateActiveSection(state: ScrollState): string {
    const viewportMiddle = state.offset + (state.windowHeight / 2);

    return state.sections.reduce((active, section) => {
      const sectionMiddle = section.top + (section.height / 2);
      const distance = Math.abs(viewportMiddle - sectionMiddle);
      
      if (distance < Math.abs(viewportMiddle - (active?.top ?? Infinity))) {
        return section;
      }
      return active;
    }, state.sections[0])?.id ?? InternalPaths.HERO;
  }
}
