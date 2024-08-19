import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HocLayoutComponent } from './hoc-layout.component';

describe('HocLayoutComponent', () => {
  let component: HocLayoutComponent;
  let fixture: ComponentFixture<HocLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HocLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HocLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
