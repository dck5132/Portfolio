import { ComponentFixture, TestBed } from '@angular/core/testing';

// Components
import { TestimonyComponent } from './testimony.component';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';

// Constants and Enums
import { Recommendations } from './constants/testimony.constants';

describe('TestimonyComponent', () => {
  let component: TestimonyComponent;
  let fixture: ComponentFixture<TestimonyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TestimonyComponent,
        SectionTitleComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestimonyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct title configuration', () => {
    expect(component.TESTIMONY_TITLE_CONFIG.title).toBe('testimonials');
    expect(component.TESTIMONY_TITLE_CONFIG.subtitle).toBeTruthy();
  });

  it('should load testimonials correctly', () => {
    expect(component.RECOMMENDATIONS).toEqual(Recommendations);
  });

  it('should detect list items correctly', () => {
    expect(component.hasListItems('- Test item')).toBeTrue();
    expect(component.hasListItems('Regular text')).toBeFalse();
  });

  it('should format list items correctly', () => {
    const testItem = '- Test item';
    expect(component.formatListItem(testItem)).toBe('Test item');
  });
});