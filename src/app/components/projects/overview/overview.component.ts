import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { NgOptimizedImage, TitleCasePipe } from '@angular/common';

// External Libraries
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

// Interfaces
import { overviewInformation } from '../interfaces/overview.interfaces';

// Components
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'portfolio-overview',
  imports: [
    NgOptimizedImage,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
  ],
  providers: [TitleCasePipe],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverviewComponent {
  // Dependencies
  private titleCasePipe = inject(TitleCasePipe);
  private dialog = inject(MatDialog);

  // State - provided through input
  readonly config = input.required<overviewInformation>();

  // Displayed State
  readonly displayedOverview = computed(() => Object.assign(this.config(), {project: this.titleCasePipe.transform(this.config().project)}));

  openDetailModal(): void {
    this.dialog.open(DetailComponent, {
      data: {
        id: this.displayedOverview().project,
        role: this.displayedOverview().subtitle
      },
      width: '600px',
      autoFocus: false,
      restoreFocus: true
    });
  }
}
