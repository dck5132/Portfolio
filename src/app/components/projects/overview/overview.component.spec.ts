import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// Third Party Libraries
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatCardHarness } from '@angular/material/card/testing';
import { MatDialog } from '@angular/material/dialog';

// Components
import { OverviewComponent } from './overview.component';

// Constants and Enums
import { ProjectTypes } from '../constants/projects.enums';

// Interfaces
import { overviewInformation } from '../interfaces/overview.interfaces';
import { ImageAlt, ImagePath } from '../../../shared/constants/image.enums';

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;
  let loader: HarnessLoader;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  const mockOverview: overviewInformation = {
    project: 'test project',
    type: ProjectTypes.PROFESSIONAL,
    description: 'Test description',
    avatar: {
      src: ImagePath.Avatar,
      alt: ImageAlt.Avatar
    },
    openButtonLabel: 'View Details',
    subtitle: 'Test Role',
    projectImage: {
      src: ImagePath.Experian,
      alt: ImageAlt.Experian
    },
    link: {
      id: 'test',
      path: 'https://test.com',
      label: 'Visit Site'
    }
  };

  beforeEach(async () => {
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        OverviewComponent
      ],
      providers: [
        { provide: MatDialog, useValue: dialogSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    
    // Set required input
    fixture.componentRef.setInput('config', mockOverview);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Card Display', () => {
    let card: MatCardHarness;

    beforeEach(async () => {
      card = await loader.getHarness(MatCardHarness);
    });

    it('should render material card', async () => {
      expect(card).toBeTruthy();
    });

    it('should display project title in titlecase', async () => {
      const title = await card.getTitleText();
      expect(title).toBe('Test Project');
    });

    it('should display subtitle', async () => {
      const subtitle = await card.getSubtitleText();
      expect(subtitle).toBe(mockOverview.subtitle ?? '');
    });

    it('should render avatar image with correct attributes', () => {
      const avatar = fixture.debugElement.query(
        By.css('img[mat-card-avatar]')
      ).nativeElement as HTMLImageElement;
      
      expect(avatar.src).toContain(mockOverview.avatar.src);
      expect(avatar.alt).toBe(mockOverview.avatar.alt);
    });

    it('should render project image when provided', () => {
      const projectImage = fixture.debugElement.query(
        By.css('.overview-card-logo')
      ).nativeElement as HTMLImageElement;
      
      expect(projectImage.src).toContain(mockOverview.projectImage!.src);
      expect(projectImage.alt).toBe(mockOverview.projectImage!.alt);
    });

    it('should display project description', () => {
      const description = fixture.debugElement.query(
        By.css('mat-card-content p')
      ).nativeElement.textContent;
      
      expect(description).toBe(mockOverview.description);
    });
  });

  describe('Card Actions', () => {
    it('should have detail button with correct label', async () => {
      const buttons = await loader.getAllHarnesses(MatButtonHarness);
      const detailButton = buttons[0];
      
      const label = await detailButton.getText();
      expect(label).toBe(mockOverview.openButtonLabel);
    });

    it('should render link button when link provided', async () => {
      const buttons = await loader.getAllHarnesses(MatButtonHarness);
      const linkButton = buttons[1];
      
      expect(linkButton).toBeTruthy();
      const label = await linkButton.getText();
      expect(label).toBe(mockOverview.link!.label ?? '');
    });

    it('should not render link button when no link provided', async () => {
      const noLinkOverview = { ...mockOverview, link: undefined };
      fixture.componentRef.setInput('config', noLinkOverview);
      fixture.detectChanges();

      const buttons = await loader.getAllHarnesses(MatButtonHarness);
      expect(buttons.length).toBe(1); // Only detail button
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels on buttons', async () => {
      const linkButton = fixture.debugElement.query(
        By.css(`[aria-labelledby="${mockOverview.link!.id}"]`)
      );
      expect(linkButton).toBeTruthy();
    });

    it('should open links in new tab with security attributes', () => {
      const link = fixture.debugElement.query(
        By.css('a[target="_blank"]')
      );
      
      expect(link.attributes['rel']).toBe('noreferrer');
      expect(link.attributes['target']).toBe('_blank');
    });
  });
});