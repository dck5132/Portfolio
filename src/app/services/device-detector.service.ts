import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

// External Libraries
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { distinctUntilChanged, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceDetectorService  {
  // Dependencies
  private breakpointObserver = inject(BreakpointObserver);
  private destroyRef = inject(DestroyRef);

  // Breakpoint Configuration
  protected readonly MOBILE_BREAKPOINTS = [Breakpoints.HandsetPortrait, Breakpoints.HandsetLandscape];
  protected readonly TABLET_BREAKPOINTS = [Breakpoints.TabletPortrait, Breakpoints.TabletLandscape];
  protected readonly IS_MOBILE_OR_TABLET = [...this.MOBILE_BREAKPOINTS, ...this.TABLET_BREAKPOINTS];
  // Application State
  readonly isMobileOrTablet = signal(false);

  constructor() {
    this.observeBreakpoints();
  }

  protected observeBreakpoints(): void {
    // Reset the values 
    this.breakpointObserver
      .observe([
        Breakpoints.Handset,
        Breakpoints.Tablet,
        Breakpoints.Web
      ])
      .pipe(
        map(result => this.checkBreakpoints(result.breakpoints)),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(isMobileOrTablet => {
        this.isMobileOrTablet.set(isMobileOrTablet);
      });
  }

  private checkBreakpoints(breakpoints: Record<string, boolean>): boolean {
    return Object.entries(breakpoints)
      .some(([query, matches]) => 
        matches && this.IS_MOBILE_OR_TABLET.includes(query)
      );
  }
}
