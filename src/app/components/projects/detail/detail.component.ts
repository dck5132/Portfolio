import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

// External Libraries
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';

// Constants and Enums
import { PositionDetails, primaryTechnologies } from '../constants/detail.constants';

@Component({
  selector: 'portfolio-detail',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatChipsModule
  ],
  templateUrl: './detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailComponent {
  // Dependencies
  private data = inject(MAT_DIALOG_DATA);

  // Display Constants
  protected readonly CLOSE = 'Close';

  // State
  readonly displayedProject = computed(() => {
    const TechByProject = primaryTechnologies.find((technologyList) => technologyList.project === this.data.id)?.tech;
    const projectDetails = {
      position: `${this.data.role} @ ${this.data.id}`, 
      details: PositionDetails.filter((detail) => detail.project === this.data.id),
      technologies: TechByProject ?? []
    };
    return projectDetails;
  });
}
