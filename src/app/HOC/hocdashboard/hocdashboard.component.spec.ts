import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HOCDashboardComponent } from './hocdashboard.component';

describe('HOCDashboardComponent', () => {
  let component: HOCDashboardComponent;
  let fixture: ComponentFixture<HOCDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HOCDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HOCDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
