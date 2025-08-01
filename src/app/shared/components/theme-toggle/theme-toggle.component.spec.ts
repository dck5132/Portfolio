import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// External Libraries
import { MatButtonHarness } from '@angular/material/button/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

// Components
import { ThemeToggleComponent } from './theme-toggle.component';

describe('ThemeToggleComponent', () => {
  let component: ThemeToggleComponent;
  let fixture: ComponentFixture<ThemeToggleComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeToggleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeToggleComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a toggle button with aria-label', () => {
    const button = fixture.debugElement.query(By.css('button'));
    expect(button).toBeTruthy();
    expect(button.attributes['aria-label']).toBeDefined();
  });

  it('should toggle theme when button is clicked', async () => {
    spyOn(component, 'toggleTheme').and.callThrough();
    const buttonHarness = await loader.getHarness(MatButtonHarness);
    await buttonHarness.click();
    expect(component.toggleTheme).toHaveBeenCalled();
  });

  it('should update icon and aria-label when theme changes', async () => {
    // Simulate toggling theme
    const initialLabel = component.themeToggleAriaLabel();
    component.toggleTheme();
    fixture.detectChanges();
    const updatedLabel = component.themeToggleAriaLabel();
    expect(updatedLabel).not.toBe(initialLabel);

    const icon = fixture.debugElement.query(By.css('fa-icon'));
    expect(icon).toBeTruthy();
  });

  it('should be focusable via keyboard', async () => {
    const buttonHarness = await loader.getHarness(MatButtonHarness);
    await buttonHarness.focus();
    expect(await buttonHarness.isFocused()).toBeTrue();
  });
});