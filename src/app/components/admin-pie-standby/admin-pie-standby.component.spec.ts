import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPieStandbyComponent } from './admin-pie-standby.component';

describe('AdminPieStandbyComponent', () => {
  let component: AdminPieStandbyComponent;
  let fixture: ComponentFixture<AdminPieStandbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPieStandbyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPieStandbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
