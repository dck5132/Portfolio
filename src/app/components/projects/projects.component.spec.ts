import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// External Libraries
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatTabGroupHarness } from '@angular/material/tabs/testing';

// Components
import { ProjectsComponent } from './projects.component';
import { OverviewComponent } from './overview/overview.component';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';

// Constants and Enums
import { ProjectFilters } from './constants/projects.constants';
import { ProjectOverviews } from './constants/overview.constants';
import { ProjectTypes } from './constants/projects.enums';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProjectsComponent,
        OverviewComponent,
        SectionTitleComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Title Configuration', () => {
    it('should initialize with correct title configuration', () => {
      expect(component.PROJECTS_TITLE_CONFIG).toEqual({
        title: 'projects',
        subtitle: component.PROJECTS_SUMMARY
      });
    });

    it('should render section title with correct configuration', () => {
      const titleComponent = fixture.debugElement.query(By.directive(SectionTitleComponent)).componentInstance as SectionTitleComponent;
      
      expect(titleComponent?.config()).toEqual(component.PROJECTS_TITLE_CONFIG);
    });
  });

  describe('Project Filtering Signal Behavior', () => {
    it('should initialize with ALL filter and show all projects', () => {
      expect(component.currentFilter()).toBe(ProjectTypes.ALL);
      expect(component.filteredOverviewList()).toEqual(ProjectOverviews);
    });

    it('should filter professional projects when signal updates', () => {
      component.currentFilter.set(ProjectTypes.PROFESSIONAL);
      fixture.detectChanges();

      const filtered = component.filteredOverviewList();
      expect(filtered.every(p => p.type === ProjectTypes.PROFESSIONAL)).toBeTrue();
      expect(filtered.length).toBe(
        ProjectOverviews.filter(p => p.type === ProjectTypes.PROFESSIONAL).length
      );
    });

    it('should filter personal projects when signal updates', () => {
      component.currentFilter.set(ProjectTypes.PERSONAL);
      fixture.detectChanges();

      const filtered = component.filteredOverviewList();
      expect(filtered.every(p => p.type === ProjectTypes.PERSONAL)).toBeTrue();
      expect(filtered.length).toBe(
        ProjectOverviews.filter(p => p.type === ProjectTypes.PERSONAL).length
      );
    });
  });

  describe('Tab Interaction and Material Integration', () => {
    let tabGroup: MatTabGroupHarness;

    beforeEach(async () => {
      tabGroup = await loader.getHarness(MatTabGroupHarness);
    });

    it('should render correct number of tabs', async () => {
      const tabs = await tabGroup.getTabs();
      expect(tabs.length).toBe(ProjectFilters.length);
    });

    it('should display correct tab labels', async () => {
      const tabs = await tabGroup.getTabs();
      const labels = await Promise.all(
        tabs.map(async tab => (await tab.getLabel()).toLowerCase())
      );
      expect(labels).toEqual(ProjectFilters);
    });

    it('should update filter when tab is selected', async () => {
      const tabs = await tabGroup.getTabs();
      const professionalTab = tabs[1]; // Professional tab is second

      await professionalTab.select();
      expect(component.currentFilter()).toBe(ProjectTypes.PROFESSIONAL);
    });

    it('should show correct projects when tab changes', async () => {
      const tabs = await tabGroup.getTabs();
      await tabs[1].select(); // Select Professional tab
      fixture.detectChanges();

      const professionalProjects = ProjectOverviews.filter(
        p => p.type === ProjectTypes.PROFESSIONAL
      );

      const overviews = fixture.debugElement.queryAll(
        By.directive(OverviewComponent)
      );
      expect(overviews.length).toBe(professionalProjects.length);
    });

    it('should have first tab selected by default', async () => {
      const selectedTab = await tabGroup.getSelectedTab();
      const label = (await selectedTab.getLabel()).toLowerCase();
      expect(label).toBe(ProjectFilters[0]);
    });

    it('should maintain tab selection after filtering', async () => {
      const tabs = await tabGroup.getTabs();
      await tabs[1].select();
      fixture.detectChanges();

      const selectedTab = await tabGroup.getSelectedTab();
      const label = (await selectedTab.getLabel()).toLowerCase();
      expect(label).toBe(ProjectFilters[1]);
    });
  });

  describe('Overview Component Integration', () => {
    it('should update overview components when filter signal changes', () => {
      const professionalProjects = ProjectOverviews.filter(
        p => p.type === ProjectTypes.PROFESSIONAL
      );
      
      component.currentFilter.set(ProjectTypes.PROFESSIONAL);
      fixture.detectChanges();

      const overviews = fixture.debugElement.queryAll(
        By.directive(OverviewComponent)
      );

      expect(overviews.length).toBe(professionalProjects.length);
      overviews.forEach((overview, index) => {
        const instance = overview.componentInstance as OverviewComponent;
        expect(instance.config()).toEqual(professionalProjects[index]);
      });
    });

    it('should pass correct data to each overview component instance', () => {
      const overviews = fixture.debugElement.queryAll(
        By.directive(OverviewComponent)
      );

      overviews.forEach((overview, index) => {
        const instance = overview.componentInstance as OverviewComponent;
        expect(instance.config()).toEqual(ProjectOverviews[index]);
      });
    });
  });

  describe('Accessibility and Layout', () => {
    it('should have proper section ARIA attributes', () => {
      const section = fixture.debugElement.query(By.css('section'));
      
      expect(section.attributes['id']).toBe('projects');
      expect(section.attributes['aria-label']).toBe('Projects section');
      expect(section.attributes['class']).toContain('projects');
      expect(section.attributes['class']).toContain('section');
    });

    it('should maintain responsive grid layout', () => {
      const gridContainer = fixture.debugElement.query(By.css('.row'));
      const gridItems = fixture.debugElement.queryAll(By.css('.col-lg-4.col-md-6'));

      expect(gridContainer).toBeTruthy();
      expect(gridItems.length).toBe(component.filteredOverviewList().length);
      gridItems.forEach(item => {
        expect(item.nativeElement.className)
          .toContain('col-lg-4');
        expect(item.nativeElement.className)
          .toContain('col-md-6');
      });
    });
  });
});