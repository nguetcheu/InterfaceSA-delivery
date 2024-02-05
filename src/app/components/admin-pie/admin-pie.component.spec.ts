import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPieComponent } from './admin-pie.component';

describe('AdminPieComponent', () => {
  let component: AdminPieComponent;
  let fixture: ComponentFixture<AdminPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
