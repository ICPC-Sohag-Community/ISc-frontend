import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HocnavComponent } from './hocnav.component';

describe('HocnavComponent', () => {
  let component: HocnavComponent;
  let fixture: ComponentFixture<HocnavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HocnavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HocnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
