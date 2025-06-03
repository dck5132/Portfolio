import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// Third Party Libraries
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatChipsModule } from '@angular/material/chips';
import { MatChipSetHarness } from '@angular/material/chips/testing';

// Components
import { DetailComponent } from './detail.component';

// Constants and Enums
import { JobTitle, Project } from '../../../shared/constants/information.enums';
import { PositionDetails, primaryTechnologies } from '../constants/detail.constants';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let loader: HarnessLoader;

  const mockDialogData = {
    id: Project.EFD,
    role: JobTitle.WEB_DEVELOPER
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatChipsModule,
        DetailComponent
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Header Display', () => {
    it('should display correct position title', () => {
      const title = fixture.debugElement.query(By.css('[mat-dialog-title]')).nativeElement.textContent;
      
      expect(title).toBe(`${mockDialogData.role} @ ${mockDialogData.id}`);
    });

    it('should display primary technologies as chips', async () => {
      const chipList = await loader.getHarness(MatChipSetHarness);
      const chips = await chipList.getChips();
      const projectTech = primaryTechnologies.find(tech => tech.project === mockDialogData.id)?.tech ?? [];

      expect(chips.length).toBe(projectTech.length);

      const chipTexts = await Promise.all(
        chips.map(chip => chip.getText())
      );
      expect(chipTexts).toEqual(projectTech);
    });
  });

  describe('Content Display', () => {
    it('should display all project details', () => {
      const projectDetails = PositionDetails.filter(
        detail => detail.project === mockDialogData.id
      );

      const headings = fixture.debugElement.queryAll(By.css('h3'));
      const descriptions = fixture.debugElement.queryAll(By.css('p'));

      expect(headings.length).toBe(projectDetails.length);
      expect(descriptions.length).toBe(projectDetails.length);

      headings.forEach((heading, index) => {
        expect(heading.nativeElement.textContent)
          .toBe(projectDetails[index].heading);
      });

      descriptions.forEach((description, index) => {
        expect(description.nativeElement.textContent)
          .toBe(projectDetails[index].description);
      });
    });

    it('should display bullet points when available', () => {
      const detailWithBullets = PositionDetails.find(detail => detail.project === mockDialogData.id && detail.bulletPoints);
      if (detailWithBullets?.bulletPoints) {
        const bulletPoints = fixture.debugElement.queryAll(By.css('[data-testid^="detail-bullet-point"]'));
        expect(bulletPoints.length).toBe(detailWithBullets.bulletPoints.length);

        bulletPoints.forEach((point, index) => {
          expect(point.nativeElement.textContent).toBe(detailWithBullets.bulletPoints![index]);
        });
      }
    });
  });

  describe('Dialog Actions', () => {
    it('should have close button', async () => {
      const closeButton = await loader.getHarness(MatButtonHarness);
      const buttonText = await closeButton.getText();
      expect(buttonText).toBe('Close');
    });

    it('should align actions to end', () => {
      const actions = fixture.debugElement.query(By.css('mat-dialog-actions'));
      expect(actions.attributes['align']).toBe('end');
    });
  });

  describe('Accessibility', () => {
    it('should have proper chip list aria-label', async () => {
      const chipList = await loader.getHarness(MatChipSetHarness);
      const element = await chipList.host();
      
      expect(await element.getAttribute('aria-label')).toBe('Primary technologies');
    });
  });
});